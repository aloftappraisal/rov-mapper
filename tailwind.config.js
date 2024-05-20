import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Lato', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'text-primary': '#072138',
                'surface-1': '#FFF',
                'surface-2': '#F7F7F7',
                'stroke-default': '#CDD3D7',
                'hover-2': '#9CAFFF',
                'selected-2': '#3455DB',
                'text-disabled': '#9CA6AF',
            },
        },
    },
    plugins: [],
};
