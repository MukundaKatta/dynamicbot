import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'DynamicBot - Robot Agility Analysis', description: 'Motion capture, gait analysis, and agility evaluation' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className="dark"><body className="min-h-screen bg-[#0f0a05] text-gray-100 antialiased">{children}</body></html>);
}
