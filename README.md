# DynamicBot

> Robot Agility Analysis and Motion Evaluation Platform

DynamicBot is a platform for analyzing robot locomotion dynamics, including motion capture playback, gait analysis, balance evaluation, obstacle course design, and failure mode investigation.

## Features

- **Motion Capture Viewer** -- Play back and analyze robot motion capture recordings
- **Gait Analysis** -- Quantitative gait cycle metrics with symmetry and stability scoring
- **Balance Visualizer** -- Real-time center-of-mass and stability margin tracking
- **Movement Library** -- Catalog of recorded movements with search and categorization
- **Physics Analysis** -- Force, torque, and energy metrics during locomotion
- **Obstacle Course Designer** -- Design and simulate terrain challenges for robots
- **Failure Analysis** -- Investigate fall events and identify root causes

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D Rendering:** Three.js, React Three Fiber, React Three Drei
- **Database:** Supabase (PostgreSQL)
- **Charts:** Recharts
- **State Management:** Zustand
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your SUPABASE_URL and SUPABASE_ANON_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  page.tsx                      # Main application with header navigation
components/
  MotionViewer.tsx              # Motion capture playback
  GaitAnalysis.tsx              # Gait cycle metrics
  BalanceVisualizer.tsx         # Stability visualization
  MovementLibrary.tsx           # Movement catalog
  PhysicsAnalysis.tsx           # Force and energy analysis
  ObstacleCourseDesigner.tsx    # Course design tool
  FailurePanel.tsx              # Fall and failure investigation
lib/
  store.ts                      # Zustand state management
  mock-data.ts                  # Sample motion and gait data
```

## License

MIT
