// figure out user's preferred theme and set it as html class for tailwind before paint
if (window) {
    const themeColor = {
        dark: '#0f172a',
        light: '#ffffff',
    };
    const isSystemColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storageTheme = sessionStorage.getItem('theme');

    if ((!storageTheme && isSystemColorSchemeDark) || storageTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.head.children.namedItem('theme-color').content = themeColor.dark;
    } else {
        // we already server-render light theme
        document.head.children.namedItem('theme-color').content = themeColor.light;
    }
}