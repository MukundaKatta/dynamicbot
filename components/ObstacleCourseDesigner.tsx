'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Plus, Play, Timer, Trophy, Mountain } from 'lucide-react';

const obstacleColors: Record<string, string> = {
  wall: '#ef4444', gap: '#3b82f6', ramp: '#f97316', beam: '#a855f7', stairs: '#22c55e', platform: '#eab308',
};

export default function ObstacleCourseDesigner() {
  const { courses } = useStore();
  const [selected, setSelected] = useState(courses[0] || null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Obstacle Course Designer</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-dyn-500 hover:bg-dyn-600 rounded-lg text-sm"><Plus size={16} /> New Course</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-3">
          {courses.map((c) => (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full text-left p-4 rounded-xl border ${
                selected?.id === c.id ? 'bg-dyn-500/20 border-dyn-500/30' : 'bg-gray-900/50 border-gray-800'
              }`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{c.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  c.difficulty === 'easy' ? 'bg-green-500/10 text-green-400' : c.difficulty === 'hard' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                }`}>{c.difficulty}</span>
              </div>
              <div className="flex gap-3 text-xs text-gray-500">
                <span>{c.obstacles.length} obstacles</span>
                <span>{c.attempts} attempts</span>
                {c.bestTime && <span className="text-dyn-400">Best: {c.bestTime}s</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="col-span-2">
          {selected ? (
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-4">Course Layout (Top View)</h3>
                <div className="relative bg-gray-800/30 rounded-lg" style={{ height: 300 }}>
                  <svg className="w-full h-full" viewBox="-1 -2 22 5">
                    <line x1={0} y1={0} x2={20} y2={0} stroke="#333" strokeWidth={0.05} strokeDasharray="0.2" />
                    {selected.obstacles.map((obs) => (
                      <g key={obs.id}>
                        <rect
                          x={obs.position[0] - obs.size[0] / 2} y={-obs.size[2] / 2}
                          width={obs.size[0]} height={obs.size[2]}
                          fill={obstacleColors[obs.type] + '40'} stroke={obstacleColors[obs.type]} strokeWidth={0.05} rx={0.05}
                        />
                        <text x={obs.position[0]} y={obs.size[2] / 2 + 0.6} textAnchor="middle" fill="#999" fontSize="0.35">{obs.type}</text>
                      </g>
                    ))}
                    <circle cx={-0.5} cy={0} r={0.2} fill="#f97316" />
                    <text x={-0.5} y={0.7} textAnchor="middle" fill="#f97316" fontSize="0.3">START</text>
                    <circle cx={selected.obstacles[selected.obstacles.length - 1]?.position[0] + 2 || 5} cy={0} r={0.2} fill="#22c55e" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                  <Mountain size={20} className="mx-auto text-dyn-400 mb-1" />
                  <p className="text-lg font-bold">{selected.obstacles.length}</p>
                  <p className="text-xs text-gray-500">Obstacles</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                  <Timer size={20} className="mx-auto text-blue-400 mb-1" />
                  <p className="text-lg font-bold">{selected.bestTime || '--'}s</p>
                  <p className="text-xs text-gray-500">Best Time</p>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center">
                  <Trophy size={20} className="mx-auto text-yellow-400 mb-1" />
                  <p className="text-lg font-bold">{selected.attempts}</p>
                  <p className="text-xs text-gray-500">Attempts</p>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-3">Obstacles</h3>
                <div className="space-y-2">
                  {selected.obstacles.map((obs, i) => (
                    <div key={obs.id} className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-2 text-sm">
                      <span className="text-xs text-gray-500 w-6">#{i + 1}</span>
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: obstacleColors[obs.type] }} />
                      <span className="capitalize flex-1">{obs.type}</span>
                      <span className="text-xs text-gray-500">Pos: ({obs.position.join(', ')})</span>
                      <span className="text-xs text-gray-500">Size: ({obs.size.join(', ')})</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-dyn-500 hover:bg-dyn-600 rounded-lg text-sm font-medium">
                <Play size={16} /> Run Simulation
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">Select a course</div>
          )}
        </div>
      </div>
    </div>
  );
}
