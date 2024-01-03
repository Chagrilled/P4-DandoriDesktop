/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            flex: {
                '0': '0 0 auto'
            },
            borderWidth: {
                'tab': '4px inset rgb(136, 67, 168)'
            },
            colors: {
                'sky-1000': '#273645'
            }
        },
        colors
    },
    plugins: [],
}

