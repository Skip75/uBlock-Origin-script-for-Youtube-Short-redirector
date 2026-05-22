YouTubeJSredirector text/javascript

(function () {
    'use strict';

    const match = location.pathname.match(/^\/shorts\/([A-Za-z0-9_-]{11})/);
    if (!match) return;

    const target = `${location.origin}/watch?v=${match[1]}`;
    if (location.href !== target) location.assign(target);
})();
