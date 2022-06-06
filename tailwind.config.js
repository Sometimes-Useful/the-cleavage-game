module.exports = {
    content: ['./public/index.html', './src/**/*.svelte'],
    theme: {
        backdropFilter: {
            none: 'none',
            blur: 'blur(20px)'
        },
        extend: {
            colors: {
                background: '#190F00',
                primary: '#A9822D',
                'primary-variant': '#E1BE3C',
                secondary: '#B93F00',
                'secondary-variant': '#C76800'
            }
        },
        fontFamily: {
            sans: ['Arial']
        }
    },
    plugins: [
        require('tailwindcss-filters')
    ]
}
