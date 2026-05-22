YouTubeJSredirector text/javascript

(function () {
    'use strict';

    console.log('redirector loaded', location.href, location.pathname);

    const m = location.pathname.match(/^\/shorts\/([A-Za-z0-9_-]{11})/);
    if (!m) {
        console.log('no shorts match');
        return;
    }

    const videoId = m[1];
    const target = `${location.origin}/watch?v=${videoId}`;
    console.log('redirect target', target);

    if (target !== location.href) {
        location.href = target;
    }
})();
