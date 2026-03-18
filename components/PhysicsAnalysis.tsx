'use client';

import { BarChart3, ArrowDown, RotateCw, Zap } from 'lucide-react';

export default function PhysicsAnalysis() {
  const metrics = [
    { label: 'Gravitational Force', value: '784.8 N', detail: 'Mass: 80kg, g: 9.81 m/s2', icon: ArrowDown },
    { label: 'Angular Momentum', value: '12.4 kg*m2/s', detail: 'About vertical axis', icon: RotateCw },
    { label: 'Kinetic Energy', value: '57.6 J', detail: 'At current velocity', icon: Zap },
    { label: 'Ground Reaction', value: '823.2 N', detail: 'Peak during stance', icon: BarChart3 },
  ];

  const jointTorques = [
    { joint: 'Hip Flexion', torque: 85, max: 120 },
    { joint: 'Hip Extension', torque: 72, max: 120 },
    { joint: 'Knee Flexion', torque: 95, max: 150 },
    { joint: 'Knee Extension', torque: 110, max: 150 },
    { joint: 'Ankle Dorsi', torque: 45, max: 80 },
    { joint: 'Ankle Plantar', torque: 68, max: 80 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Physics Analysis</h2>
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <m.icon size={18} className="text-dyn-400 mb-2" />
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-gray-400 mt-1">{m.label}</p>
            <p className="text-xs text-gray-600">{m.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-4">Joint Torques</h3>
          <div className="space-y-3">
            {jointTorques.map((jt) => (
              <div key={jt.joint}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">{jt.joint}</span>
                  <span className="text-dyn-400">{jt.torque} / {jt.max} Nm</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${jt.torque / jt.max > 0.85 ? 'bg-red-500' : jt.torque / jt.max > 0.7 ? 'bg-yellow-500' : 'bg-dyn-500'}`}
                    style={{ width: `${(jt.torque / jt.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-4">Energy Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'Kinetic (Translation)', value: 57.6, pct: 35, color: 'bg-dyn-500' },
              { label: 'Kinetic (Rotation)', value: 12.3, pct: 8, color: 'bg-blue-500' },
              { label: 'Potential', value: 68.4, pct: 42, color: 'bg-green-500' },
              { label: 'Elastic (Tendons)', value: 24.1, pct: 15, color: 'bg-purple-500' },
            ].map((e) => (
              <div key={e.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">{e.label}</span>
                  <span>{e.value} J ({e.pct}%)</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${e.color}`} style={{ width: `${e.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
