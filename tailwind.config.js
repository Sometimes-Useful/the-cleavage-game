module.exports = {
    content: ['./public/index.html', './src/**/*.svelte'],
    theme: {
        extend: {
            colors: {
                'no-emphasis': '#A79B94',
                'dark-background': '#190F00',
                'cleave-left': '#B80000',
                'cleave-right': '#0000B8',
                'low-emphasis': '#6C5118',
                'medium-emphasis': '#BF923B',
                'high-emphasis': '#E8D7B7'
            }
        },
        fontFamily: {
            sans: ['Arial']
        }
    },
    plugins: []
}
