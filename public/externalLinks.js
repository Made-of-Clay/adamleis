/** @param {MouseEvent} event */
function handleExternalLinks(event) {
    event.preventDefault();
    open(event.target.href);
}

document.querySelectorAll('a[href]').forEach((link) => {
    const isExternal = link.href.substring(0, location.origin.length) !== location.origin;
    if (isExternal && !link.getAttribute('target'))
        link.addEventListener('click', handleExternalLinks);
});
