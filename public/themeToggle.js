if (window) {
    const themeColor = {
        dark: '#212121',
        light: '#ffffff',
    };
    const isSystemColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storageTheme = sessionStorage.getItem('theme');
    const theme = storageTheme || (isSystemColorSchemeDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);
    document.head.children.namedItem('theme-color').content = themeColor[theme];
}
