/**
 * Initializes Spotify authorization in a popup window
 * @param  {Function} callback callback method for the access token
 */
const login = async (callback) => {
    // get
    const CLIENT_ID = await $.get('/client-id');
    const REDIRECT_URI = 'https://knowyourmusic.herokuapp.com/callback';
    const getLoginURL = (scopes) => {
        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token' +
            '&show_dialog=true';
    }
    const url = getLoginURL(['user-library-read', 'user-read-email']);
    const width = 450, height = 730, left = (screen.width / 2) - (width / 2), top = (screen.height / 2) - (height / 2);
    // Once the user logs in
    window.addEventListener("message", (event) => {
        var hash = JSON.parse(event.data);
        if (hash.type == 'access_token') {
            callback(hash.access_token);
        }
    }, false);
    // Opens login window
    const w = window.open(url,
        'Spotify Login',
        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    );
}


$('.spotify').click(() => {
    // Once button is clicked, retrieve access token and post to server
    login((token) => {
        $.post('/access', { token: token });
        location.href = "/start";
    });
});
