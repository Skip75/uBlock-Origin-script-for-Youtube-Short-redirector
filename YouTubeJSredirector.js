YouTubeJSredirector text/javascript

(function () {
    'use strict';

    function extractShortsId(pathname) {
        const match = pathname.match(/^\/shorts\/([A-Za-z0-9_-]{11})/);
        return match ? match[1] : null;
    }

    function buildWatchUrl(originalUrl) {
        const url = new URL(originalUrl);
        const videoId = extractShortsId(url.pathname);
        if (!videoId) return null;

        const params = new URLSearchParams(url.search);
        const t = params.get('t') || params.get('start');
        params.delete('start');
        params.set('v', videoId);
        if (t) params.set('t', t);

        return `${url.origin}/watch?${params.toString()}${url.hash}`;
    }

    function checkAndRedirect() {
        if (!/^\/shorts\//.test(location.pathname)) return;

        const newUrl = buildWatchUrl(location.href);
        console.log('shorts redirector', { href: location.href, newUrl });

        if (newUrl && newUrl !== location.href) {
            location.replace(newUrl);
        }
    }

    checkAndRedirect();
    window.addEventListener('yt-navigate-finish', checkAndRedirect);

    let lastUrl = location.href;
    const observer = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            checkAndRedirect();
        }
    });

    if (document.documentElement) {
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
})();
