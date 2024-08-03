if (location.hostname === 'localhost') {
    const gtagEl = document.createElement('script');
    gtagEl.async = 'async';
    gtagEl.src = 'https://www.googletagmanager.com/gtag/js?id=G-3FB5326RZH';
    document.body.appendChild(gtagEl);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    gtag('config', 'G-3FB5326RZH');
}