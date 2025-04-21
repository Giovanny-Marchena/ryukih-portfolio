import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            spacing: {
                'card-sm-w': '508.75px',
                'card-sm-h': '426.27px',
                'card-md-w': '728.25px',
                'card-md-h': '572.58px',
                'card-lg-w': '1277px',
                'card-lg-h': '938.38px',
            },
            colors: {
                sand: {
                    50: '#FFEDD8',
                    100: '#F3D5B5',
                    200: '#E7BC91',
                    300: '#D4A276',
                    400: '#BC8A5F',
                    500: '#A47148',
                    600: '#8B5E34',
                    700: '#6F4518',
                    800: '#603808',
                    900: '#583101',
                },
                gold: '#C1A75F',
            },
        },
    },
    plugins: [],
};

export default config;
