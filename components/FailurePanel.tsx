'use client';

import { useStore } from '@/lib/store';
import { AlertTriangle, Shield, Zap, Clock, Wrench } from 'lucide-react';

const typeConfig: Record<string, { color: string; icon: any }> = {
  balance: { color: 'text-yellow-400', icon: Shield },
  collision: { color: 'text-red-400', icon: AlertTriangle },
  timeout: { color: 'text-blue-400', icon: Clock },
  mechanical: { color: 'text-orange-400', icon: Wrench },
  control: { color: 'text-purple-400', icon: Zap },
};

const sevColors: Record<string, string> = {
  minor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  moderate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  severe: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function FailurePanel() {
  const { failures, movements } = useStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Failure Analysis</h2>

      <div className="grid grid-cols-5 gap-4">
        {Object.entries(typeConfig).map(([type, config]) => {
          const count = failures.filter((f) => f.type === type).length;
          const Icon = config.icon;
          return (
            <div key={type} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <Icon size={18} className={config.color + ' mb-2'} />
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-gray-400 capitalize">{type}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {failures.map((f) => {
          const config = typeConfig[f.type];
          const Icon = config.icon;
          const movement = movements.find((m) => m.id === f.movementId);
          return (
            <div key={f.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-800/50 rounded-lg"><Icon size={18} className={config.color} /></div>
                  <div>
                    <h3 className="font-semibold">{f.description}</h3>
                    <div className="flex gap-3 text-xs text-gray-500 mt-1">
                      <span>Movement: <span className="text-gray-300">{movement?.name}</span></span>
                      <span>Type: <span className={config.color + ' capitalize'}>{f.type}</span></span>
                      <span>{new Date(f.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="mt-3 bg-gray-800/30 rounded-lg p-3">
                      <p className="text-xs text-gray-400"><span className="text-dyn-400 font-semibold">Recommendation:</span> {f.recommendation}</p>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded border ${sevColors[f.severity]}`}>{f.severity}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
