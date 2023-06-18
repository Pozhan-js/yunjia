/** @type {import('tailwindcss').Config} */
// import forms from '@tailwindcss/forms';
// import lineClamp from '@tailwindcss/line-clamp';

module.exports = {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
        // './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            borderRadius: {
                DEFAULT: '0.63rem'
            },
            margin: {
                '30': '7.5rem',
            },
            colors: {
                gray: {
                    100: '#FBFBFB',
                    200: '#EAEAEA',
                    300: '#DFDFDF',
                    400: '#999999',
                    450: '#FFFFFF66',
                    500: '#7F7F7F',
                    600: '#666666',
                    700: '#4C4C4C',
                    800: '#333333',
                    900: '#191919',
                },
                blue: {
                    100: '#E6F0FD',
                    200: '#CCE2FC',
                    300: '#99C5FA',
                    400: '#66A9F7',
                    500: '#338CF5',
                    600: '#0070F4',
                    700: '#0064DA',
                    800: '#0059C2',
                    900: '#004391',
                },
                teal: {
                    100: '#E6FFFA',
                    200: '#B2F5EA',
                    300: '#81E6D9',
                    400: '#4FD1C5',
                    500: '#3ABAB4',
                    600: '#319795',
                    700: '#2C7A7B',
                    800: '#285E61',
                    900: '#234E52',
                },
                purple: {
                    600: '#B902FD',
                    800: '#6F19F7'
                }
            },
            boxShadow: {
                xs: '0 0 0 1px rgba(0, 0, 0, 0.16)',
                sm: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
                default: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                md: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                lg: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
                xl: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
                outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                none: 'none',
            },
            spacing: {
                '9/16': '56.25%',
                '3/4': '75%',
                '1/1': '100%',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                montserrat: ['MontserratLight'],
                msr: ['MontserratLight'],
                msrb: ['MontserratBold'],
                gtwal: ['GTWalsheimProRegular'],
                gtwalp: ['GTWalsheimProRegular'],
                gtwalm: ['GTWalsheimMedium'],
                gtwalmp: ['GTWalsheimProMedium'],
                gtwalpm: ['GTWalsheimProMedium'],
                gtwalmpo: ['GTWalsheimProMediumOblique'],
                gtwalb: ['GTWalsheimBold'],
                gtwalbpo: ['GTWalsheimProBoldOblique'],
                ggm: ['GalanoGrotesqueMedium'],
                ggr: ['GalanoGrotesqueRegular'],
                ktp: ['Krungthep'],
                shscn: ['Source Han Sans CN-Heavy', 'Source Han Sans CN']
            },
            inset: {
                '1/2': '50%',
                'full': '100%',
            },
            letterSpacing: {
                tighter: '-0.02em',
                tight: '-0.01em',
                normal: '0',
                wide: '0.01em',
                wider: '0.02em',
                widest: '0.4em',
            },
            lineHeight: {
                none: '1',
                tighter: '1.125',
                tight: '1.25',
                snug: '1.375',
                normal: '1.5',
                relaxed: '1.625',
                loose: '2',
                '3': '.75rem',
                '4': '1rem',
                '5': '1.2rem',
                '6': '1.5rem',
                '7': '1.75rem',
                '8': '2rem',
                '9': '2.25rem',
                '10': '2.5rem',
            },
            minWidth: {
                '10': '2.5rem',
                '48': '12rem',
            },
            opacity: {
                '90': '0.9',
            },
            scale: {
                '98': '.98'
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': {transform: 'translateY(0)',},
                    '50%': {transform: 'translateY(-5%)',},
                },
            },
            zIndex: {
                '-1': '-1',
            },
            width: {
                '25': '6.25rem'
            },
            screens: {
                'mob-xs': '360px',
                'mob-sm': '375px'
            }
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
        translate: ['responsive', 'hover', 'focus', 'group-hover'],
        boxShadow: ['responsive', 'hover', 'focus', 'focus-within'],
        opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    plugins: [
        // forms,
        // lineClamp
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp')
    ],
}
