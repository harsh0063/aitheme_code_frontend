tailwind.config = {
  content: ['*.html'],
  theme: {
    extend: {
      colors: {
        gray: '#5D7186',
        primary: '#ff6c2f',
      },
      container: {
        center: true,
        padding: '12px',
        screens: {
          DEFAULT: '100%',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
          '3xl': '1640px',
        },
      },
    },

  }
}