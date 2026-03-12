/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './src/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'bleu-abysse': '#002C41',
        'turquoise-ocean': '#0A97A6',

        // Accent / Expertise cards
        'terre-laterite': '#A34C26',
        'lagon-mayotte': '#2D7890',
        'sable-corail': '#AC8652',
        'nuit-australe': '#587682',
        'ecume-poudree': '#6EAEB5',

        // Neutral
        'brume-alize': '#809AA0',
        'gris-merou': '#636A6B',
        'gris-clair': '#F6F6F6',
      },
      fontFamily: {
        display: ['"Zalando Sans Expanded"', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['40px', { lineHeight: '44.5px', letterSpacing: '0' }],
        'heading-xl': ['32px', { lineHeight: '1.461', letterSpacing: '0' }],
        'heading-lg': ['20px', { lineHeight: '1.461', letterSpacing: '0' }],
        'heading-md': ['16px', { lineHeight: '1.4', letterSpacing: '0' }],
        'label-sm': ['12px', { lineHeight: '1', letterSpacing: '1.44px' }],
        'label-xs': ['10px', { lineHeight: '1', letterSpacing: '1.2px' }],
        'body-base': ['16px', { lineHeight: '1.4', letterSpacing: '0' }],
        'body-sm': ['14px', { lineHeight: '14px', letterSpacing: '0' }],
        'caption': ['12px', { lineHeight: '1.01', letterSpacing: '0' }],
        'caption-xs': ['10px', { lineHeight: '14px', letterSpacing: '0' }],
      },
      fontWeight: {
        black: '900',
        extrabold: '800',
        bold: '700',
        semibold: '600',
        medium: '500',
        regular: '400',
      },
      borderRadius: {
        button: '3px',
        input: '5px',
      },
      letterSpacing: {
        'label': '1.44px',
        'label-sm': '1.2px',
        'label-lg': '2.2px',
        'label-xl': '2.4px',
      },
    },
  },
  plugins: [],
};
