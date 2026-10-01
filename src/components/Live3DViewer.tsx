import React, { useState, useRef, useEffect } from 'react';
import { Property } from '../types';
import {
  RotateCcw,
  Sun,
  Moon,
  Layers,
  Compass,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  MapPin,
  Eye,
  Sparkles,
  Info
} from 'lucide-react';

interface Live3DViewerProps {
  property: Property;
  className?: string;
}

type FloorLevel = 'all' | 'ground' | 'level1' | 'roof';

export const Live3DViewer: React.FC<Live3DViewerProps> = ({ property, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Orbital Camera States
  const [rotationX, setRotationX] = useState<number>(22); // Pitch angle (degrees)
  const [rotationY, setRotationY] = useState<number>(45); // Yaw angle (degrees)
  const [zoom, setZoom] = useState<number>(1);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [lightingMode, setLightingMode] = useState<'day' | 'twilight'>('twilight');
  const [selectedLevel, setSelectedLevel] = useState<FloorLevel>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Hotspots for architectural points of interest
  const hotspots = [
    { id: 'pool', label: 'Heated Infinity Edge Pool', x: 260, y: 310, desc: 'Heated pool with natural stone coping and underwater fiber optic illumination.' },
    { id: 'foyer', label: 'Double-Height Foyer', x: 380, y: 220, desc: 'Triple-glazed soundproof glass facade with floating teakwood stairs.' },
    { id: 'solar', label: '10kVA Solar Hybrid Micro-grid', x: 420, y: 120, desc: 'Roof-mounted Tier-1 monocrystalline panels with lithium storage battery.' },
    { id: 'gate', label: '24ft Paved Road Access & EV Bay', x: 160, y: 360, desc: 'Direct access to blacktopped avenue with automated security barrier.' }
  ];

  // Animation Loop for 3D Canvas
  useEffect(() => {
    let animId: number;
    let autoAngle = rotationY;

    const render = () => {
      if (isAutoRotating && !isDraggingRef.current) {
        autoAngle = (autoAngle + 0.25) % 360;
        setRotationY(autoAngle);
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Background Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (lightingMode === 'twilight') {
        skyGrad.addColorStop(0, '#090d16');
        skyGrad.addColorStop(0.6, '#1a1f33');
        skyGrad.addColorStop(1, '#2c223b');
      } else {
        skyGrad.addColorStop(0, '#78a2cc');
        skyGrad.addColorStop(0.5, '#b4d2ea');
        skyGrad.addColorStop(1, '#f1f5f9');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Himalayan / Mountain Ridge Silhouettes
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height * 0.45);
      const peaks = [
        [width * 0.1, height * 0.38],
        [width * 0.25, height * 0.32],
        [width * 0.38, height * 0.39],
        [width * 0.55, height * 0.29],
        [width * 0.72, height * 0.37],
        [width * 0.88, height * 0.33],
        [width, height * 0.44]
      ];
      for (const [px, py] of peaks) {
        ctx.lineTo(px, py);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = lightingMode === 'twilight' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(148, 163, 184, 0.45)';
      ctx.fill();
      ctx.restore();

      // Coordinate Transformation Matrix for 3D Isometric / Perspective
      ctx.save();
      ctx.translate(centerX, centerY + 30);
      ctx.scale(zoom, zoom);

      const radYaw = (rotationY * Math.PI) / 180;
      const radPitch = (rotationX * Math.PI) / 180;
      const cosY = Math.cos(radYaw);
      const sinY = Math.sin(radYaw);
      const cosX = Math.cos(radPitch);
      const sinX = Math.sin(radPitch);

      // 3D to 2D projection function
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y (yaw)
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        // Rotate around X (pitch)
        const y2 = y * cosX - z1 * sinX;
        return { px: x1, py: y2 };
      };

      // 1. Ground Land Parcel (Lalpurja Plot Boundary)
      const plotSize = 220;
      const p1 = project(-plotSize, 60, -plotSize);
      const p2 = project(plotSize, 60, -plotSize);
      const p3 = project(plotSize, 60, plotSize);
      const p4 = project(-plotSize, 60, plotSize);

      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.lineTo(p3.px, p3.py);
      ctx.lineTo(p4.px, p4.py);
      ctx.closePath();
      ctx.fillStyle = lightingMode === 'twilight' ? '#14201b' : '#3d6146';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = lightingMode === 'twilight' ? '#34d399' : '#10b981';
      ctx.stroke();

      // 2. Road Access Strip
      const r1 = project(-plotSize, 59, plotSize - 40);
      const r2 = project(plotSize, 59, plotSize - 40);
      const r3 = project(plotSize, 59, plotSize);
      const r4 = project(-plotSize, 59, plotSize);
      ctx.beginPath();
      ctx.moveTo(r1.px, r1.py);
      ctx.lineTo(r2.px, r2.py);
      ctx.lineTo(r3.px, r3.py);
      ctx.lineTo(r4.px, r4.py);
      ctx.closePath();
      ctx.fillStyle = lightingMode === 'twilight' ? '#1e293b' : '#475569';
      ctx.fill();

      // 3. Swimming Pool with Water Caustics
      const poolW = 90;
      const poolL = 50;
      const po1 = project(50, 58, 40);
      const po2 = project(50 + poolW, 58, 40);
      const po3 = project(50 + poolW, 58, 40 + poolL);
      const po4 = project(50, 58, 40 + poolL);
      ctx.beginPath();
      ctx.moveTo(po1.px, po1.py);
      ctx.lineTo(po2.px, po2.py);
      ctx.lineTo(po3.px, po3.py);
      ctx.lineTo(po4.px, po4.py);
      ctx.closePath();
      ctx.fillStyle = lightingMode === 'twilight' ? '#0ea5e9' : '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#bae6fd';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 4. Ground Floor Structure
      if (selectedLevel === 'all' || selectedLevel === 'ground') {
        drawBox(project, ctx, -100, -30, 20, 150, 45, 120, lightingMode, 'ground');
      }

      // 5. Level 1 Structure (Balconies & Cantilever)
      if (selectedLevel === 'all' || selectedLevel === 'level1') {
        drawBox(project, ctx, -90, -75, 10, 140, 45, 110, lightingMode, 'level1');
      }

      // 6. Rooftop & Solar Pergola
      if (selectedLevel === 'all' || selectedLevel === 'roof') {
        drawBox(project, ctx, -70, -105, 0, 100, 30, 80, lightingMode, 'roof');

        // Solar Array Panel Rows
        const sp1 = project(-50, -110, 10);
        const sp2 = project(10, -110, 10);
        const sp3 = project(10, -110, 50);
        const sp4 = project(-50, -110, 50);
        ctx.beginPath();
        ctx.moveTo(sp1.px, sp1.py);
        ctx.lineTo(sp2.px, sp2.py);
        ctx.lineTo(sp3.px, sp3.py);
        ctx.lineTo(sp4.px, sp4.py);
        ctx.closePath();
        ctx.fillStyle = '#1e3a8a';
        ctx.fill();
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    };

    render();
    if (isAutoRotating) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [rotationX, rotationY, zoom, isAutoRotating, lightingMode, selectedLevel]);

  // Helper to render volumetric 3D box with lighting & glass windows
  const drawBox = (
    project: (x: number, y: number, z: number) => { px: number; py: number },
    ctx: CanvasRenderingContext2D,
    bx: number,
    by: number,
    bz: number,
    bw: number,
    bh: number,
    bd: number,
    lighting: 'day' | 'twilight',
    tier: string
  ) => {
    // 8 vertices of cuboid
    const v = [
      project(bx, by, bz),
      project(bx + bw, by, bz),
      project(bx + bw, by + bh, bz),
      project(bx, by + bh, bz),
      project(bx, by, bz + bd),
      project(bx + bw, by, bz + bd),
      project(bx + bw, by + bh, bz + bd),
      project(bx, by + bh, bz + bd)
    ];

    // Top face
    ctx.beginPath();
    ctx.moveTo(v[0].px, v[0].py);
    ctx.lineTo(v[1].px, v[1].py);
    ctx.lineTo(v[5].px, v[5].py);
    ctx.lineTo(v[4].px, v[4].py);
    ctx.closePath();
    ctx.fillStyle = lighting === 'twilight' ? '#334155' : '#f1f5f9';
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.stroke();

    // Front face (glass curtain with interior illumination)
    ctx.beginPath();
    ctx.moveTo(v[4].px, v[4].py);
    ctx.lineTo(v[5].px, v[5].py);
    ctx.lineTo(v[6].px, v[6].py);
    ctx.lineTo(v[7].px, v[7].py);
    ctx.closePath();
    ctx.fillStyle =
      lighting === 'twilight'
        ? tier === 'ground'
          ? 'rgba(251, 191, 36, 0.45)' // Warm golden glow
          : 'rgba(245, 158, 11, 0.35)'
        : 'rgba(224, 242, 254, 0.7)';
    ctx.fill();
    ctx.strokeStyle = lighting === 'twilight' ? '#fbbf24' : '#0284c7';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Side face
    ctx.beginPath();
    ctx.moveTo(v[1].px, v[1].py);
    ctx.lineTo(v[2].px, v[2].py);
    ctx.lineTo(v[6].px, v[6].py);
    ctx.lineTo(v[5].px, v[5].py);
    ctx.closePath();
    ctx.fillStyle = lighting === 'twilight' ? '#1e293b' : '#cbd5e1';
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.stroke();
  };

  // Mouse / Touch handlers for manual 3D orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsAutoRotating(false);
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setRotationY((prev) => (prev + deltaX * 0.8) % 360);
    setRotationX((prev) => Math.max(-10, Math.min(65, prev - deltaY * 0.6)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const resetView = () => {
    setRotationX(22);
    setRotationY(45);
    setZoom(1);
    setSelectedLevel('all');
    setIsAutoRotating(true);
  };

  return (
    <div
      className={`relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : className
      }`}
    >
      {/* 3D WebGL / HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        width={850}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
      />

      {/* Top Overlay Bar: Property Title & Telemetry */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
        <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <div className="text-xs">
            <span className="font-bold font-display">{property.title}</span>
            <span className="text-[10px] text-slate-400 ml-2">Live 3D Model</span>
          </div>
        </div>

        {/* Telemetry Indicator */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 text-[11px] font-mono tabular-nums">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Pitch: {Math.round(rotationX)}°</span>
          <span>·</span>
          <span>Yaw: {Math.round((rotationY + 360) % 360)}°</span>
          <span>·</span>
          <span>Facing: {property.specs.facing}</span>
        </div>
      </div>

      {/* Floating Hotspot Clickers */}
      <div className="absolute inset-0 pointer-events-none">
        {hotspots.map((hs) => (
          <button
            key={hs.id}
            onClick={() => setSelectedHotspot(hs.id === selectedHotspot ? null : hs.id)}
            style={{ left: `${(hs.x / 850) * 100}%`, top: `${(hs.y / 500) * 100}%` }}
            className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-5 h-5 rounded-full bg-amber-400/40 animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                ✦
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Hotspot Info Popup Drawer */}
      {selectedHotspot && (
        <div className="absolute top-16 left-4 max-w-xs bg-slate-900/95 backdrop-blur-md border border-amber-500/40 rounded-xl p-3.5 text-white shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-amber-400 font-display">
              {hotspots.find((h) => h.id === selectedHotspot)?.label}
            </span>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
            {hotspots.find((h) => h.id === selectedHotspot)?.desc}
          </p>
        </div>
      )}

      {/* Left Control Bar: Floor Level Switcher */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 text-xs">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-0.5">
          Floor Level
        </span>
        <button
          onClick={() => setSelectedLevel('all')}
          className={`px-2.5 py-1 rounded-lg text-left font-medium transition-colors cursor-pointer ${
            selectedLevel === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          All Levels
        </button>
        <button
          onClick={() => setSelectedLevel('ground')}
          className={`px-2.5 py-1 rounded-lg text-left font-medium transition-colors cursor-pointer ${
            selectedLevel === 'ground' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Ground Floor
        </button>
        <button
          onClick={() => setSelectedLevel('level1')}
          className={`px-2.5 py-1 rounded-lg text-left font-medium transition-colors cursor-pointer ${
            selectedLevel === 'level1' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Level 1 Suites
        </button>
        <button
          onClick={() => setSelectedLevel('roof')}
          className={`px-2.5 py-1 rounded-lg text-left font-medium transition-colors cursor-pointer ${
            selectedLevel === 'roof' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          Rooftop & Solar
        </button>
      </div>

      {/* Bottom Right Floating Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 text-slate-300">
        {/* Auto Orbit */}
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          title={isAutoRotating ? 'Pause auto-rotation' : 'Start auto-rotation'}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Day / Twilight Toggle */}
        <button
          onClick={() => setLightingMode(lightingMode === 'day' ? 'twilight' : 'day')}
          title="Toggle Day / Twilight lighting"
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          {lightingMode === 'twilight' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Zoom In */}
        <button
          onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
          title="Zoom In"
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
          title="Zoom Out"
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        {/* Reset View */}
        <button
          onClick={resetView}
          title="Reset 3D camera angle"
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          title="Toggle fullscreen"
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Instructions Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] text-slate-400 border border-slate-800 pointer-events-none">
        <span>Click & drag to orbit in 3D · Click hotspots for architectural specs</span>
      </div>
    </div>
  );
};
