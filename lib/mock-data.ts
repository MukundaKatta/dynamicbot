import { MotionCapture, GaitProfile, Movement, ObstacleCourse, FailureAnalysis } from './store';

const genFrames = (count: number) => Array.from({ length: count }, (_, i) => ({
  time: i / 30,
  joints: {
    hip_l: [Math.sin(i * 0.2) * 30, 0, 0] as [number, number, number],
    hip_r: [Math.sin(i * 0.2 + Math.PI) * 30, 0, 0] as [number, number, number],
    knee_l: [Math.abs(Math.sin(i * 0.2)) * 60, 0, 0] as [number, number, number],
    knee_r: [Math.abs(Math.sin(i * 0.2 + Math.PI)) * 60, 0, 0] as [number, number, number],
  },
  com: [i * 0.02, 0.9 + Math.sin(i * 0.4) * 0.03, 0] as [number, number, number],
}));

export const mockCaptures: MotionCapture[] = [
  { id: 'mc1', name: 'Walking Gait A', robot: 'Atlas-7', duration: 10, fps: 30, frames: genFrames(300), created_at: '2024-04-01T10:00:00Z' },
  { id: 'mc2', name: 'Running Sprint', robot: 'Atlas-7', duration: 5, fps: 30, frames: genFrames(150), created_at: '2024-04-01T11:00:00Z' },
  { id: 'mc3', name: 'Stair Climbing', robot: 'Hermes-2', duration: 15, fps: 30, frames: genFrames(450), created_at: '2024-04-01T12:00:00Z' },
];

export const mockGaits: GaitProfile[] = [
  { id: 'g1', name: 'Standard Walk', type: 'walk', speed: 1.2, stepLength: 0.65, cadence: 110, stability: 92, efficiency: 88,
    phases: [{ name: 'Heel Strike', duration: 0.1, color: '#f97316' }, { name: 'Stance', duration: 0.3, color: '#22c55e' }, { name: 'Toe Off', duration: 0.1, color: '#3b82f6' }, { name: 'Swing', duration: 0.3, color: '#a855f7' }] },
  { id: 'g2', name: 'Fast Walk', type: 'walk', speed: 2.0, stepLength: 0.8, cadence: 140, stability: 85, efficiency: 82,
    phases: [{ name: 'Heel Strike', duration: 0.08, color: '#f97316' }, { name: 'Stance', duration: 0.22, color: '#22c55e' }, { name: 'Toe Off', duration: 0.08, color: '#3b82f6' }, { name: 'Swing', duration: 0.22, color: '#a855f7' }] },
  { id: 'g3', name: 'Jog', type: 'run', speed: 3.5, stepLength: 1.1, cadence: 170, stability: 78, efficiency: 75,
    phases: [{ name: 'Foot Strike', duration: 0.06, color: '#f97316' }, { name: 'Stance', duration: 0.15, color: '#22c55e' }, { name: 'Push Off', duration: 0.06, color: '#3b82f6' }, { name: 'Flight', duration: 0.15, color: '#ef4444' }] },
];

export const mockMovements: Movement[] = [
  { id: 'mv1', name: 'Forward Walk', category: 'Locomotion', difficulty: 1, description: 'Standard forward walking', successRate: 98, avgForce: 120 },
  { id: 'mv2', name: 'Side Step', category: 'Locomotion', difficulty: 2, description: 'Lateral stepping movement', successRate: 95, avgForce: 130 },
  { id: 'mv3', name: 'Jump', category: 'Agility', difficulty: 4, description: 'Vertical jump from standing', successRate: 72, avgForce: 450 },
  { id: 'mv4', name: 'Balance Recovery', category: 'Stability', difficulty: 3, description: 'Recovery from perturbation', successRate: 85, avgForce: 200 },
  { id: 'mv5', name: 'Stair Ascent', category: 'Navigation', difficulty: 3, description: 'Climbing stairs', successRate: 88, avgForce: 280 },
  { id: 'mv6', name: 'Crouch Walk', category: 'Stealth', difficulty: 3, description: 'Walking in crouched position', successRate: 82, avgForce: 150 },
  { id: 'mv7', name: 'Backflip', category: 'Agility', difficulty: 5, description: 'Full backward rotation', successRate: 35, avgForce: 800 },
  { id: 'mv8', name: 'Hurdle Clear', category: 'Agility', difficulty: 4, description: 'Jumping over a hurdle', successRate: 68, avgForce: 500 },
];

export const mockCourses: ObstacleCourse[] = [
  { id: 'oc1', name: 'Basic Training', difficulty: 'easy', bestTime: 45.2, attempts: 12,
    obstacles: [
      { id: 'obs1', type: 'ramp', position: [2, 0, 0], size: [2, 0.5, 1], rotation: 0 },
      { id: 'obs2', type: 'gap', position: [5, 0, 0], size: [1, 0, 1], rotation: 0 },
      { id: 'obs3', type: 'stairs', position: [8, 0, 0], size: [1.5, 1, 1], rotation: 0 },
    ] },
  { id: 'oc2', name: 'Urban Challenge', difficulty: 'hard', bestTime: 120.5, attempts: 5,
    obstacles: [
      { id: 'obs4', type: 'wall', position: [3, 0, 0], size: [0.3, 1.5, 2], rotation: 0 },
      { id: 'obs5', type: 'beam', position: [6, 0.5, 0], size: [3, 0.1, 0.2], rotation: 0 },
      { id: 'obs6', type: 'platform', position: [10, 0, 0], size: [1, 0.8, 1], rotation: 0 },
      { id: 'obs7', type: 'gap', position: [13, 0, 0], size: [2, 0, 1], rotation: 0 },
      { id: 'obs8', type: 'ramp', position: [16, 0, 0], size: [3, 1.5, 1], rotation: 0 },
    ] },
];

export const mockFailures: FailureAnalysis[] = [
  { id: 'f1', movementId: 'mv7', type: 'balance', description: 'Insufficient angular momentum during backflip', severity: 'severe', timestamp: '2024-04-01T14:30:00Z', recommendation: 'Increase leg thrust force by 15%' },
  { id: 'f2', movementId: 'mv3', type: 'mechanical', description: 'Left knee actuator peak torque exceeded', severity: 'moderate', timestamp: '2024-04-01T13:00:00Z', recommendation: 'Reduce jump height target or upgrade actuator' },
  { id: 'f3', movementId: 'mv8', type: 'collision', description: 'Trailing foot clipped hurdle top edge', severity: 'minor', timestamp: '2024-04-01T12:00:00Z', recommendation: 'Increase minimum clearance height by 3cm' },
  { id: 'f4', movementId: 'mv4', type: 'control', description: 'PID overshoot during lateral recovery', severity: 'moderate', timestamp: '2024-04-01T11:30:00Z', recommendation: 'Tune damping coefficient from 0.7 to 0.85' },
];
