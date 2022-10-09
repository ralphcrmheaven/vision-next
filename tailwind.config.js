module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx,woff}', './public/index.html'],
    theme: {
        extend: {
            borderRadius: {
                '6xl': '2.5rem',
            },
            colors: {
                'vision-blue': '#053F64',
                'vision-light-blue': '#084D79',
                'vision-lighter-blue': '#0B5A8C',
                'vision-dark-blue': '#053F64',
                'vision-yellow': '#F7BA49;',
                'vision-light-yellow': '#FFC822',
                'vision-lighter-yellow': '#FFD862',
                'vision-sky': '#007AD9',
                'vision-light-sky': '#1E8CE1',
                'vision-lighter-sky': '#5AAFF1',
                'vision-green': '#01798A',
                'vision-light-green': '#008C8C',
                'vision-lighter-green': '#009999',
                'vision-cyan': '#008C8C',
                'vision-red':'#FF6355',
                'vision-light-red':'#FF8479',
                'vision-lighter-red':'#FFA098',
                'vision-card-bg':'#FBFBFB'
            },
            scale: {
                25: '0.25',
                30: '0.30',
            },
            spacing: {
                '220px': '220px',
                '100px': '100px',
                72.5: '18.5rem',
                '2px': '2px',
            },
            width: {
                455: '455px',
                360: '360px',
                972: '972px',
            },
            height: {
                '310px': '310px',
            },
            padding: {
                '20px': '20px',
            },
        },
    },
    plugins: [],
}
