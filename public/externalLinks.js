/** @param {MouseEvent} event */
function handleExternalLinks(event) {
    event.preventDefault();
    open(event.target.href);
}

document.querySelectorAll('a[href]').forEach((link) => {
    if (link.href.substring(0, location.origin.length) !== location.origin)
        link.addEventListener('click', handleExternalLinks);
});
