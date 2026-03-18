'use client';

import { useState } from 'react';
import { useStore, GaitProfile } from '@/lib/store';
import { Footprints, TrendingUp, Gauge, Shield } from 'lucide-react';

export default function GaitAnalysis() {
  const { gaits } = useStore();
  const [selected, setSelected] = useState<GaitProfile>(gaits[0]);

  if (!selected) return <p className="text-gray-500">No gaits loaded</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Gait Analysis</h2>

      <div className="flex gap-3">
        {gaits.map((g) => (
          <button key={g.id} onClick={() => setSelected(g)}
            className={`px-4 py-2 rounded-lg text-sm border ${
              selected.id === g.id ? 'bg-dyn-500/20 border-dyn-500/30 text-dyn-400' : 'bg-gray-900/50 border-gray-800 text-gray-400'
            }`}>{g.name}</button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Speed', value: `${selected.speed} m/s`, icon: TrendingUp, color: 'text-dyn-400' },
          { label: 'Step Length', value: `${selected.stepLength} m`, icon: Footprints, color: 'text-blue-400' },
          { label: 'Cadence', value: `${selected.cadence} spm`, icon: Gauge, color: 'text-purple-400' },
          { label: 'Stability', value: `${selected.stability}%`, icon: Shield, color: 'text-green-400' },
        ].map((m) => (
          <div key={m.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1"><m.icon size={16} className={m.color} /><span className="text-sm text-gray-400">{m.label}</span></div>
            <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="font-semibold text-sm mb-4">Gait Cycle Phases</h3>
        <div className="flex rounded-lg overflow-hidden h-12 mb-4">
          {selected.phases.map((phase, i) => (
            <div key={i} style={{ flex: phase.duration, backgroundColor: phase.color + '40', borderRight: '1px solid #222' }}
              className="flex items-center justify-center text-xs font-medium" title={phase.name}>
              {phase.name}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {selected.phases.map((phase, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: phase.color }} />
              <span>{phase.name}: {(phase.duration * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-3">Efficiency Analysis</h3>
          <div className="space-y-3">
            {[
              { label: 'Energy Efficiency', value: selected.efficiency },
              { label: 'Stability Score', value: selected.stability },
              { label: 'Smoothness', value: Math.round(selected.stability * 0.95) },
              { label: 'Symmetry', value: Math.round(selected.efficiency * 1.05) },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{item.label}</span><span>{item.value}%</span></div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.value > 85 ? 'bg-green-500' : item.value > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <h3 className="font-semibold text-sm mb-3">Ground Reaction Force (simulated)</h3>
          <div className="h-40 flex items-end gap-px">
            {Array.from({ length: 40 }).map((_, i) => {
              const phase = i / 40;
              const force = phase < 0.3 ? Math.sin(phase * Math.PI / 0.3) : phase < 0.6 ? 0.7 + Math.sin((phase - 0.3) * Math.PI / 0.3) * 0.3 : Math.max(0, 1 - (phase - 0.6) / 0.4);
              return (
                <div key={i} className="flex-1 bg-dyn-500/40 rounded-t" style={{ height: `${force * 100}%` }} />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>0%</span><span>Gait Cycle</span><span>100%</span></div>
        </div>
      </div>
    </div>
  );
}
