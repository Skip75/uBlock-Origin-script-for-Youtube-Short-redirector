/// YouTubeJSredirector.js
(function () {
    'use strict';

    function extractShortsId(url) {
        // Extrait l'ID depuis /shorts/VIDEO_ID[/][?...][#...]
        const match = url.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
        return match ? match[1] : null;
    }

    function buildWatchUrl(originalUrl) {
        const url = new URL(originalUrl);
        const videoId = extractShortsId(url.pathname);
        if (!videoId) return null;

        // Construire les paramètres : on garde tout sauf si on veut filtrer
        const params = new URLSearchParams(url.search);
        // 't' ou 'start' → on les conserve comme 't' pour le lecteur watch
        const t = params.get('t') || params.get('start');
        params.delete('start');

        // Injecter video id
        params.set('v', videoId);
        if (t && !params.has('t')) params.set('t', t);

        // Reconstruire l'URL proprement
        return `${url.origin}/watch?${params.toString()}${url.hash}`;
    }

    function checkAndRedirect() {
        if (!window.location.pathname.match(/^\/shorts\//)) return;

        const newUrl = buildWatchUrl(window.location.href);
        if (newUrl) {
            window.location.replace(newUrl);
        }
    }

    checkAndRedirect();

    let lastUrl = window.location.href;

    const observer = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            checkAndRedirect();
        }
    });

    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }
})();
