import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/compositions/**/*.{ts,tsx}',
    './src/views/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      // see context/device/index
      mb: { max: '801.9px' }, // isMobileView
      ds: '802px', // isDesktopView
      nr: { min: '802px', max: '1279.9px' }, // isNarrowVie
      '-wd': { max: '1280px' },
      'wd': { min: '1280px' },
      '2wd': '1366px', // for more control (view where both sidebars are fixed in viewport)
    },
    extend: {
      colors: {
        'bg-l0': '#10141A', // main background (almost black)
        'bg-l1': '#181E25', // sidebar/panels
        'bg-l2': '#232B36', // cards
        'bg-l3': '#232B36', // modals/overlays

        'grey-90': '#FFFFFF', // main text (white)
        'grey-70': '#B0B8C1', // secondary text
        'grey-60': '#ffffff', // muted text
        'grey-40': '#4B5563', // borders/dividers
        'grey-20': '#232B36', // subtle backgrounds
        'grey-15': '#181E25',
        'grey-10': '#10141A',

        'primary': '#1DAEFF', // bright blue for buttons, highlights
        'primary-hover': '#1592D4',
        'primary-dark': '#0D6BA8',

        'accent-green': '#3EFF8B',
        'accent-yellow': '#1592D4',
        'accent-red': '#1592D4',
        'accent-blue': '#1DAEFF',
        'accent-purple': '#CA5AFF',

        'brand-70': '#B84200',
        'brand-60': '#1592D4',
        'brand-50': '#1592D4',
        'brand-15': '#3A2B20',
        'brand-10': '#642900',
        'brand-5': '#4DC4FF1A',

        'accent-pink': '#1592D4',
        'accent-pink-5': '#442E37',
        'accent-green-5': '#122018',
        'accent-green-10': '#134C2A',
        'accent-yellow-10': '#E5B02B1A',
        'accent-red-5': '#3D1F24',
        'accent-red-10': '#632C2A',
      },
      borderRadius: {
        'ssm': '0.375rem', // 6
        'min': '0.5rem', // 8
        'sm': '0.75rem', // 12
        'md': '1rem', // 16
        'lg': '1.25rem', // 20
      },
      backgroundImage: ({ theme }) => ({
        'card-border-top': 'linear-gradient(180deg, rgba(239, 239, 243, 0.15) 0%, rgba(77, 196, 255, 0.1)  100%)',
        'card-border-bottom': 'linear-gradient(180deg, rgba(77, 196, 255, 0.1)  0%, rgba(29, 174, 255, 0.15) 100%)',
        'live-switcher-bg': 'linear-gradient(90deg, rgba(61, 32, 31, 0.5) 0%, rgba(61, 32, 31, 0) 100%)',
        'betslip-item-bg': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.brand-10')} 300%)`,
        'betslip-item-bg-inc': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.accent-green')} 300%)`,
        'betslip-item-bg-dec': `linear-gradient(90.08deg, ${theme('colors.bg-l2')} 0.06%, ${theme('colors.accent-red')} 300%)`,
        'live-game-shadow': `linear-gradient(90deg, ${theme('colors.accent-red')} -1000%, ${theme('colors.bg-l2')} 100%)`,
        'live-bet-shadow': `linear-gradient(90deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-red')} 800%)`,
        'result-button-won': `linear-gradient(180deg, ${theme('colors.grey-15')} 0%, ${theme('colors.accent-green')} 1500%)`,
        'result-button-lost': `linear-gradient(90deg, ${theme('colors.grey-15')} 0%, ${theme('colors.accent-red')} 1500%)`,
        'bet-game-won': `linear-gradient(180deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-green')} 1000%)`,
        'bet-game-lost': `linear-gradient(180deg, ${theme('colors.bg-l3')} 0%, ${theme('colors.accent-red')} 1000%)`,
        'live-event-gradient': `linear-gradient(90deg, transparent 0%, ${theme('colors.accent-red')} 50%, transparent 100%)`,
        'sidebar-active-gradient': 'linear-gradient(180deg, #4DC4FF1A 0%, rgba(29, 174, 255, 0.00) 40%, rgba(77, 196, 255, 0.1) 60%, rgba(77, 196, 255, 0.2) 80%, rgba(77, 196, 255, 0.3) 100%)',
        'wallet-connect-gradient': 'linear-gradient(90deg, #1592D4 0%, rgba(77, 196, 255, 0.5) 40%, rgba(77, 196, 255, 0.6) 60%, rgba(77, 196, 255, 0.7) 80%, rgba(77, 196, 255, 0.8) 100%)',

      }),
      boxShadow: ({ theme }) => ({
        'betslip': `0px -10px 30px ${theme('colors.bg-l1')}`,
        'searchInput': 'rgba(0, 0, 0, 0.35) 0px 5px 15px', // soft blue and black shadow
      }),
      fill: {
        'gradient-azuro-waves-grey': '#c4cfe4',
        'gradient-azuro-waves-mist': '#a5d0e6',
        // ATTN: check /local_modules/svg-provider/SvgSprite.tsx
        'gradient-azuro-waves-sky': 'url(#gradient-azuro-waves-sky)',
        'gradient-azuro-waves-blue': 'url(#gradient-azuro-waves-blue)',
        'gradient-azuro-waves-ultramarine': 'url(#gradient-azuro-waves-ultramarine)',
        'gradient-azuro-waves-bright': 'url(#gradient-azuro-waves-bright)',
        'gradient-azuro-waves-brilliant': 'url(#gradient-azuro-waves-brilliant)',
        'gradient-azuro-waves-royal': 'url(#gradient-azuro-waves-royal)',
      },
      fontFamily: {
        sans: [ 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif' ],
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    plugin(({ addComponents, matchUtilities, theme }) => {
      // addBase({
      //   'body': { backgroundColor: theme('colors.test') },
      // })
      addComponents({
        '.text-heading-h1': {
          fontSize: '1.75rem', // 28
          lineHeight: '2.25rem', // 36
        },
        '.text-heading-h2': {
          fontSize: '1.5rem', // 24
          lineHeight: '2rem', // 32
        },
        '.text-heading-h3': {
          fontSize: '1.25rem', // 20
          lineHeight: '1.625rem', // 26
        },
        '.text-heading-h4': {
          fontSize: '1.125rem', // 18
          lineHeight: '1.5rem', // 24
        },
        '.text-heading-h5': {
          fontSize: '1rem', // 16
          lineHeight: '1.25rem', // 20
        },
        '.text-caption-14': {
          fontSize: '0.875rem', // 14
          lineHeight: '1.125rem', // 18
        },
        '.text-caption-13': {
          fontSize: '0.813rem', // 13
          lineHeight: '1rem', // 16
        },
        '.text-caption-12': {
          fontSize: '0.75rem', // 12
          lineHeight: '0.875rem', // 14
        },
        '.text-label-12': {
          fontSize: '0.688rem', // 11
          lineHeight: '0.813rem', // 13
        },
      })
    }),
  ],
}

export default config
