/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      height: {
        sidebar: 'calc(100vh - 14rem)',
        bodyModal: 'calc(100vh - 16rem)'
      },
      colors: {
        primary: '#0891b2',
        onPrimary: 'rgb(255, 255, 255)',
        primaryContainer: 'rgb(172, 237, 255)',
        onPrimaryContainer: 'rgb(0, 31, 38)',
        secondary: 'rgb(75, 98, 105)',
        onSecondary: 'rgb(255, 255, 255)',
        secondaryContainer: 'rgb(206, 231, 239)',
        onSecondaryContainer: 'rgb(6, 31, 36)',
        tertiary: 'rgb(86, 93, 126)',
        onTertiary: 'rgb(255, 255, 255)',
        tertiaryContainer: 'rgb(221, 225, 255)',
        onTertiaryContainer: 'rgb(19, 25, 55)',
        error: 'rgb(186, 26, 26)',
        onError: 'rgb(255, 255, 255)',
        errorContainer: 'rgb(255, 218, 214)',
        onErrorContainer: 'rgb(65, 0, 2)',
        background: 'rgb(251, 252, 253)',
        onBackground: 'rgb(25, 28, 29)',
        surface: 'rgb(251, 252, 253)',
        onSurface: 'rgb(25, 28, 29)',
        surfaceVariant: 'rgb(219, 228, 231)',
        onSurfaceVariant: 'rgb(63, 72, 75)',
        outline: 'rgb(112, 121, 123)',
        outlineVariant: 'rgb(191, 200, 203)',
        shadow: 'rgb(0, 0, 0)',
        scrim: 'rgb(0, 0, 0)',
        inverseSurface: 'rgb(46, 49, 50)',
        inverseOnSurface: 'rgb(239, 241, 242)',
        inversePrimary: 'rgb(76, 215, 246)',
        elevation: {
          level0: 'transparent',
          level1: 'rgb(238, 245, 246)',
          level2: 'rgb(231, 240, 243)',
          level3: 'rgb(223, 236, 239)',
          level4: 'rgb(221, 234, 237)',
          level5: 'rgb(216, 231, 235)'
        },
        surfaceDisabled: 'rgba(25, 28, 29, 0.12)',
        onSurfaceDisabled: 'rgba(25, 28, 29, 0.38)',
        backdrop: 'rgba(41, 50, 52, 0.4)',
        border: 'rgba(0, 0, 0, 0.4)',
        background: 'rgba(248, 247, 250, 1)',
        color: 'rgba(47, 43, 61, 0.9)',
        sidebar: 'rgba(47, 51, 73, 1)',
        onSidebar: 'rgba(225, 222, 245, 0.9)',
        hoverSidebar: 'rgba(225, 222, 245, 0.15)',
        form: 'rgba(69, 90, 100, 1)',
        border: 'rgba(176, 190, 197, 1)',
        primary: '#0891b2'
      },
      boxShadow: {
        custom: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
      },
      keyframes: {
        progress: {
          '0%': { transform: 'translateX(-20%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        progress: 'progress 0.6s ease-in-out forwards'
      }
    }
  },
  plugins: []
};
