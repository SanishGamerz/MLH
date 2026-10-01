import React, { useState, useRef, useEffect } from 'react';
import { Property, Currency } from '../types';
import {
  X,
  Sparkles,
  Send,
  Building,
  HelpCircle,
  FileText,
  DollarSign,
  Compass,
  ArrowRight,
  ShieldCheck,
  Bot
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: string;
  propertyTitle?: string | null;
}

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeProperty?: Property | null;
  currency: Currency;
  onSelectProperty?: (property: Property) => void;
}

const QUICK_PROMPTS = [
  {
    icon: ShieldCheck,
    label: 'Lalpurja & Legal Checklist',
    prompt: 'What are the essential legal steps and documents needed to verify a Lalpurja and transfer land ownership at Malpot in Nepal?'
  },
  {
    icon: DollarSign,
    label: 'Mortgage & NRB Rules',
    prompt: 'Explain the current commercial bank home loan interest rates, down payment rules, and 70% LTV limits under Nepal Rastra Bank directives.'
  },
  {
    icon: Compass,
    label: 'Kathmandu Neighborhood Guide',
    prompt: 'Compare Baluwatar, Jhamsikhel, and Budhanilkantha in terms of land value per Aana, embassy safety, and lifestyle.'
  },
  {
    icon: Building,
    label: 'Ropani-Aana Land Units',
    prompt: 'How does land measurement in Nepal work? Explain Ropani, Aana, Paisa, and Daam with square feet conversions.'
  }
];

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  activeProperty,
  currency
}) => {
  if (!isOpen) return null;

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: activeProperty
        ? `Namaste! I am your EstateEase Real Estate & Valuation Advisor. I see you are inspecting **${activeProperty.title}** in ${activeProperty.location.area}. Would you like an analysis of its land value per Aana, seismic structural standard, mortgage breakdown, or legal Lalpurja title status?`
        : `Namaste! I am your EstateEase Real Estate & Valuation Advisor. Ask me anything about property valuations in Kathmandu Valley or Pokhara, Nepal Rastra Bank home loan regulations, Lalpurja verification, or eSewa/Khalti token reservations.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      propertyTitle: activeProperty?.title
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          propertyId: activeProperty?.id,
          currency
        })
      });

      const data = await res.json();
      if (data.success) {
        const assistantMsg: Message = {
          role: 'assistant',
          content: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: data.source,
          propertyTitle: data.propertyReferenced
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'I apologize, I could not complete the query. Please try again.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Connection error while communicating with the AI service. Please verify your internet connection.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold font-display flex items-center gap-2">
                <span>EstateEase AI Advisory</span>
                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                  Gemini 3.8 Flash
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Specialized in Nepal Real Estate, Legal Deeds & Mortgages
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Focus property context banner */}
        {activeProperty && (
          <div className="bg-amber-50/80 border-b border-amber-200/80 px-4 py-2 text-xs flex items-center justify-between gap-2 shrink-0">
            <div className="truncate">
              <span className="text-amber-800 font-semibold">Active Subject: </span>
              <span className="text-slate-800 font-medium">{activeProperty.title}</span>
            </div>
            <span className="text-[11px] text-amber-900 font-bold shrink-0">
              रू {(activeProperty.priceNPR / 10000000).toFixed(2)} Cr
            </span>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-4 text-xs sm:text-[13px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-br-xs'
                    : 'bg-slate-100 text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                {/* Assistant avatar indicator */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 mb-1.5">
                    <Bot className="w-3.5 h-3.5" />
                    <span>EstateEase Advisor</span>
                    {msg.propertyTitle && (
                      <span className="text-slate-500 font-normal">· {msg.propertyTitle}</span>
                    )}
                  </div>
                )}

                <div className="whitespace-pre-line space-y-1">
                  {msg.content}
                </div>

                <div
                  className={`text-[10px] mt-2 pt-1 border-t ${
                    msg.role === 'user' ? 'border-slate-800 text-slate-400 text-right' : 'border-slate-200 text-slate-400 text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span>Consulting Gemini & Nepal property regulations...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 shrink-0">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Suggested Consultation Inquiries
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-800 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                <item.icon className="w-3 h-3 text-amber-600" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white shrink-0">
          <div className="relative flex items-end bg-slate-50 border border-slate-300 rounded-xl p-2 focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500">
            <textarea
              rows={2}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={activeProperty ? `Ask about ${activeProperty.title}...` : "Ask about properties, Lalpurja verification, or mortgages..."}
              className="w-full bg-transparent resize-none text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none px-2 py-1"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputPrompt.trim()}
              className="p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[10px] text-slate-400 mt-1.5 text-center">
            Advisory verified with Nepal Land Revenue Act and NRB Banking Directives.
          </div>
        </div>

      </div>
    </div>
  );
};
