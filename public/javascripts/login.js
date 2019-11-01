function login(callback) {
    $.post('/client-id').then(CLIENT_ID => {
        var REDIRECT_URI = 'https://knowyourmusic.herokuapp.com/callback';
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
                '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
                '&scope=' + encodeURIComponent(scopes.join(' ')) +
                '&response_type=token' +
                '&show_dialog=true';
        }

        var url = getLoginURL([
            'user-library-read', 'user-read-email'
        ]);

        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        window.addEventListener("message", function (event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);

        var w = window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );
    }).catch(err => {
        location.href = "/error";
        console.log(err);
    });
}

$('.spotify').click(function () {
    login(function(token) {
        $.post('/access', {token: token });
        location.href = "/start";
    });
});
