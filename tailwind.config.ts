import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { dyn: { 400: '#f97316', 500: '#ea580c', 600: '#c2410c', 700: '#9a3412' } } } },
  plugins: [],
};
export default config;
