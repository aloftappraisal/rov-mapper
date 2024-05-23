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
                'text-secondary': '#394D60',
                'surface-1': '#FFF',
                'surface-2': '#F7F7F7',
                'surface-3': '#F4F7FF',
                'surface-readonly': '#e1e4e7',
                'stroke-default': '#CDD3D7',
                'stroke-light': '#E7E7E7',
                'hover-2': '#9CAFFF',
                'selected-2': '#3455DB',
                'text-disabled': '#9CA6AF',
                'button-default': '#3455DB',
            },
        },
    },
    plugins: [],
};
