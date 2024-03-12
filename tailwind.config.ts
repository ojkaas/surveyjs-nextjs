import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'lofi',
      {
        'lofi-dark': {
          primary: '#808080',
          'primary-focus': '#737373',
          'primary-content': '#f2f2f3',

          secondary: '#4d4d4d',
          'secondary-focus': '#404040',
          'secondary-content': '#f2f2f3',

          accent: '#1a1a1a',
          'accent-focus': '#0d0d0d',
          'accent-content': '#f2f2f3',

          neutral: '#f2f2f3',
          'neutral-focus': '#e4e4e7',
          'neutral-content': '#4d4d4d',

          'base-100': '#1f1e1e',
          'base-200': '#585656',
          'base-300': '#808080',
          'base-content': '#dbdbdb',

          info: '#1c92f2',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',

          '--rounded-box': '0',
          '--rounded-btn': '0',
          '--rounded-badge': '0',

          '--animation-btn': '0',
          '--animation-input': '0',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
}
export default config
