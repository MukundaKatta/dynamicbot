'use client';

import { useStore } from '@/lib/store';
import { Library, Star, Zap, Target } from 'lucide-react';

export default function MovementLibrary() {
  const { movements } = useStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Movement Library</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {movements.map((m) => (
          <div key={m.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-dyn-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm">{m.name}</h3>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={10} className={i < m.difficulty ? 'text-dyn-400 fill-dyn-400' : 'text-gray-700'} />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">{m.description}</p>
            <div className="text-xs text-gray-500 mb-2">{m.category}</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-800/30 rounded p-2 text-center">
                <Target size={12} className="mx-auto text-green-400 mb-1" />
                <p className="text-xs font-bold">{m.successRate}%</p>
                <p className="text-xs text-gray-500">Success</p>
              </div>
              <div className="bg-gray-800/30 rounded p-2 text-center">
                <Zap size={12} className="mx-auto text-dyn-400 mb-1" />
                <p className="text-xs font-bold">{m.avgForce}N</p>
                <p className="text-xs text-gray-500">Avg Force</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
