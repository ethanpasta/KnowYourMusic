/**
 * Function takes care of Spotify callback
 */
(() => {
    const hash = {};
    // Extract keys and values from url
    window.location.hash.replace(/^#\/?/, '').split('&').forEach((kv) => {
        const spl = kv.indexOf('=');
        if (spl != -1) {
            hash[kv.substring(0, spl)] = decodeURIComponent(kv.substring(spl + 1));
        }
    });
    if (hash.access_token) {
        window.opener.postMessage(JSON.stringify({
            type: 'access_token',
            access_token: hash.access_token,
            expires_in: hash.expires_in || 0
        }), '*');
        window.close();
    }
})();