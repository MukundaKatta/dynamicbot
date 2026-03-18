'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { mockCaptures, mockGaits, mockMovements, mockCourses, mockFailures } from '@/lib/mock-data';
import { Activity, Footprints, Library, Mountain, AlertTriangle, BarChart3, Eye } from 'lucide-react';
import MotionViewer from '@/components/MotionViewer';
import GaitAnalysis from '@/components/GaitAnalysis';
import MovementLibrary from '@/components/MovementLibrary';
import ObstacleCourseDesigner from '@/components/ObstacleCourseDesigner';
import FailurePanel from '@/components/FailurePanel';
import BalanceVisualizer from '@/components/BalanceVisualizer';
import PhysicsAnalysis from '@/components/PhysicsAnalysis';

const tabs = [
  { id: 'motion', label: 'Motion Capture', icon: Eye },
  { id: 'gait', label: 'Gait Analysis', icon: Footprints },
  { id: 'balance', label: 'Balance', icon: Activity },
  { id: 'library', label: 'Movement Library', icon: Library },
  { id: 'physics', label: 'Physics', icon: BarChart3 },
  { id: 'obstacles', label: 'Obstacle Course', icon: Mountain },
  { id: 'failures', label: 'Failure Analysis', icon: AlertTriangle },
];

export default function HomePage() {
  const { activeTab, setActiveTab, setCaptures, setGaits, setMovements, setCourses, setFailures } = useStore();

  useEffect(() => {
    setCaptures(mockCaptures);
    setGaits(mockGaits);
    setMovements(mockMovements);
    setCourses(mockCourses);
    setFailures(mockFailures);
  }, [setCaptures, setGaits, setMovements, setCourses, setFailures]);

  const renderContent = () => {
    switch (activeTab) {
      case 'motion': return <MotionViewer />;
      case 'gait': return <GaitAnalysis />;
      case 'balance': return <BalanceVisualizer />;
      case 'library': return <MovementLibrary />;
      case 'physics': return <PhysicsAnalysis />;
      case 'obstacles': return <ObstacleCourseDesigner />;
      case 'failures': return <FailurePanel />;
      default: return <MotionViewer />;
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">DynamicBot</h1>
            <p className="text-sm text-gray-400">Robot Agility Analysis Platform</p>
          </div>
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                    activeTab === tab.id ? 'bg-dyn-500/20 text-dyn-400 border border-dyn-500/30' : 'text-gray-400 hover:bg-gray-800/50'
                  }`}>
                  <Icon size={14} />{tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>
      <main className="p-6">{renderContent()}</main>
    </div>
  );
}
