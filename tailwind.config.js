/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        reddit: {
          bg: '#DAE0E6',
          card: '#FFFFFF',
          border: '#CCCCCC',
          'border-light': '#EDEFF1',
          'vote-bg': '#F8F9FA',
          orange: '#FF4500',
          blue: '#0079D3',
          text: '#1A1A1B',
          'text-secondary': '#7C7C83',
        },
      },
    },
  },
  plugins: [],
}
