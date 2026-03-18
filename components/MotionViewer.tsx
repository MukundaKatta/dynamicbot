'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { useStore } from '@/lib/store';
import { Play, Pause, SkipBack } from 'lucide-react';

function StickFigure({ frame }: { frame: any }) {
  if (!frame) return null;
  const com = frame.com;
  return (
    <group position={[com[0], com[1], com[2]]}>
      <mesh position={[0, 0.4, 0]}><sphereGeometry args={[0.12, 16, 16]} /><meshStandardMaterial color="#f97316" /></mesh>
      <mesh position={[0, 0, 0]}><capsuleGeometry args={[0.06, 0.4, 8, 16]} /><meshStandardMaterial color="#ea580c" /></mesh>
      <mesh position={[-0.15, -0.5, 0]}><capsuleGeometry args={[0.05, 0.35, 8, 16]} /><meshStandardMaterial color="#c2410c" /></mesh>
      <mesh position={[0.15, -0.5, 0]}><capsuleGeometry args={[0.05, 0.35, 8, 16]} /><meshStandardMaterial color="#c2410c" /></mesh>
    </group>
  );
}

export default function MotionViewer() {
  const { captures } = useStore();
  const [selected, setSelected] = useState(captures[0] || null);
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Motion Capture Viewer</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm mb-2">Recordings</h3>
          {captures.map((c) => (
            <button key={c.id} onClick={() => { setSelected(c); setFrame(0); }}
              className={`w-full text-left p-3 rounded-lg border text-sm ${
                selected?.id === c.id ? 'bg-dyn-500/20 border-dyn-500/30 text-dyn-400' : 'bg-gray-900/50 border-gray-800 text-gray-400'
              }`}>
              <p className="font-medium">{c.name}</p>
              <p className="text-xs text-gray-500">{c.robot} | {c.duration}s | {c.fps}fps</p>
            </button>
          ))}
        </div>
        <div className="col-span-2 bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden" style={{ height: 400 }}>
          <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
            <ambientLight intensity={0.4} /><directionalLight position={[5, 5, 5]} intensity={1} />
            {selected && <StickFigure frame={selected.frames[frame]} />}
            <Grid position={[0, -0.01, 0]} args={[20, 20]} cellSize={0.5} cellColor="#1a1a0a" sectionSize={2} sectionColor="#2a2a1a" />
            <OrbitControls />
          </Canvas>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-2">Playback</h3>
            <div className="flex items-center gap-2 mb-3">
              <button onClick={() => setFrame(0)} className="p-1.5 bg-gray-800 rounded"><SkipBack size={14} /></button>
              <button onClick={() => setPlaying(!playing)} className="p-1.5 bg-dyn-500 rounded">
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>
            {selected && (
              <>
                <input type="range" min={0} max={selected.frames.length - 1} value={frame}
                  onChange={(e) => setFrame(parseInt(e.target.value))}
                  className="w-full accent-dyn-500" />
                <p className="text-xs text-gray-500 mt-1">Frame {frame + 1}/{selected.frames.length}</p>
              </>
            )}
          </div>
          {selected && selected.frames[frame] && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <h3 className="text-sm font-semibold mb-2">Center of Mass</h3>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between"><span className="text-gray-400">X:</span><span className="text-dyn-400">{selected.frames[frame].com[0].toFixed(3)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Y:</span><span className="text-dyn-400">{selected.frames[frame].com[1].toFixed(3)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Z:</span><span className="text-dyn-400">{selected.frames[frame].com[2].toFixed(3)}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
