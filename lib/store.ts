import { create } from 'zustand';

export interface MotionCapture {
  id: string; name: string; robot: string; duration: number; fps: number;
  frames: { time: number; joints: Record<string, [number, number, number]>; com: [number, number, number] }[];
  created_at: string;
}

export interface GaitProfile {
  id: string; name: string; type: 'walk' | 'run' | 'climb' | 'crawl' | 'jump' | 'turn';
  speed: number; stepLength: number; cadence: number; stability: number; efficiency: number;
  phases: { name: string; duration: number; color: string }[];
}

export interface Movement {
  id: string; name: string; category: string; difficulty: number;
  description: string; successRate: number; avgForce: number;
}

export interface ObstacleCourse {
  id: string; name: string; obstacles: Obstacle[];
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  bestTime: number | null; attempts: number;
}

export interface Obstacle {
  id: string; type: 'wall' | 'gap' | 'ramp' | 'beam' | 'stairs' | 'platform';
  position: [number, number, number]; size: [number, number, number]; rotation: number;
}

export interface FailureAnalysis {
  id: string; movementId: string; type: 'balance' | 'collision' | 'timeout' | 'mechanical' | 'control';
  description: string; severity: 'minor' | 'moderate' | 'severe';
  timestamp: string; recommendation: string;
}

interface DynamicBotState {
  activeTab: string;
  captures: MotionCapture[];
  gaits: GaitProfile[];
  movements: Movement[];
  courses: ObstacleCourse[];
  failures: FailureAnalysis[];
  setActiveTab: (tab: string) => void;
  setCaptures: (c: MotionCapture[]) => void;
  setGaits: (g: GaitProfile[]) => void;
  setMovements: (m: Movement[]) => void;
  setCourses: (c: ObstacleCourse[]) => void;
  setFailures: (f: FailureAnalysis[]) => void;
}

export const useStore = create<DynamicBotState>((set) => ({
  activeTab: 'motion',
  captures: [], gaits: [], movements: [], courses: [], failures: [],
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCaptures: (captures) => set({ captures }),
  setGaits: (gaits) => set({ gaits }),
  setMovements: (movements) => set({ movements }),
  setCourses: (courses) => set({ courses }),
  setFailures: (failures) => set({ failures }),
}));
