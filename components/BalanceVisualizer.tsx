'use client';

import { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export default function BalanceVisualizer() {
  const [comX, setComX] = useState(0);
  const [comY, setComY] = useState(0);
  const [history, setHistory] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nx = comX + (Math.random() - 0.5) * 0.1;
      const ny = comY + (Math.random() - 0.5) * 0.1;
      const cx = Math.max(-1, Math.min(1, nx));
      const cy = Math.max(-1, Math.min(1, ny));
      setComX(cx);
      setComY(cy);
      setHistory((h) => [...h.slice(-50), { x: cx, y: cy }]);
    }, 100);
    return () => clearInterval(interval);
  }, [comX, comY]);

  const dist = Math.sqrt(comX * comX + comY * comY);
  const stable = dist < 0.3;
  const caution = dist >= 0.3 && dist < 0.7;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Balance Visualizer</h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-400">Stability</p>
          <p className={`text-3xl font-bold ${stable ? 'text-green-400' : caution ? 'text-yellow-400' : 'text-red-400'}`}>
            {stable ? 'Stable' : caution ? 'Caution' : 'Unstable'}
          </p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-400">CoM Offset</p>
          <p className="text-3xl font-bold text-dyn-400">{dist.toFixed(3)}m</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <p className="text-sm text-gray-400">Support Polygon</p>
          <p className="text-3xl font-bold text-blue-400">0.12 m&sup2;</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="font-semibold text-sm mb-4">Center of Mass Projection</h3>
          <div className="relative mx-auto" style={{ width: 300, height: 300 }}>
            <svg viewBox="-1.5 -1.5 3 3" className="w-full h-full">
              <circle cx={0} cy={0} r={1} fill="none" stroke="#1a3a1a" strokeWidth={0.02} />
              <circle cx={0} cy={0} r={0.7} fill="none" stroke="#3a3a1a" strokeWidth={0.01} strokeDasharray="0.05" />
              <circle cx={0} cy={0} r={0.3} fill="none" stroke="#1a3a1a" strokeWidth={0.01} strokeDasharray="0.05" />
              <line x1={-1} y1={0} x2={1} y2={0} stroke="#222" strokeWidth={0.005} />
              <line x1={0} y1={-1} x2={0} y2={1} stroke="#222" strokeWidth={0.005} />
              {/* Support polygon */}
              <polygon points="-0.3,-0.15 0.3,-0.15 0.25,0.15 -0.25,0.15" fill="#f9731620" stroke="#f97316" strokeWidth={0.015} />
              {/* History trail */}
              {history.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={0.015} fill="#f97316" opacity={i / history.length * 0.5} />
              ))}
              {/* Current CoM */}
              <circle cx={comX} cy={comY} r={0.04} fill="#f97316" />
              <circle cx={comX} cy={comY} r={0.06} fill="none" stroke="#f97316" strokeWidth={0.01} opacity={0.5} />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-3">Real-time Metrics</h3>
            <div className="space-y-3">
              {[
                { label: 'CoM X', value: comX },
                { label: 'CoM Y', value: comY },
                { label: 'Sway Rate', value: dist * 2 },
                { label: 'Angular Momentum', value: Math.abs(comX * comY) * 10 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{m.label}</span>
                    <span className="font-mono text-dyn-400">{m.value.toFixed(4)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-dyn-500/60 rounded-full transition-all" style={{ width: `${Math.min(100, Math.abs(m.value) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-3">Stability Regions</h3>
            <div className="space-y-2">
              {[
                { label: 'Stable Zone (< 0.3m)', icon: CheckCircle, color: 'text-green-400', active: stable },
                { label: 'Caution Zone (0.3-0.7m)', icon: AlertTriangle, color: 'text-yellow-400', active: caution },
                { label: 'Unstable Zone (> 0.7m)', icon: AlertTriangle, color: 'text-red-400', active: !stable && !caution },
              ].map((z) => (
                <div key={z.label} className={`flex items-center gap-2 p-2 rounded text-xs ${z.active ? 'bg-gray-800/50' : 'opacity-40'}`}>
                  <z.icon size={14} className={z.color} />
                  <span className={z.color}>{z.label}</span>
                  {z.active && <span className="ml-auto text-white font-bold">ACTIVE</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
