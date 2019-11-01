function displayPage(data, level) {
    $('button.song-option').removeClass('clicked done');
    $('.song-name').removeClass('true false');
    $('.line').html('" ' + data[level].line + ' "');
    $('.quest').html('What song is this line from?')
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    const buttons = document.getElementsByClassName('song-option')
    const arr = shuffle($.makeArray(buttons));
    $('.songs').html(arr);
    let pretty;
    for (let i = 0; i < 4; i++) {
        pretty = data[level].tracks[i].song.replace(/ *\([^)]*\) */g, "");
        pretty = pretty.replace(/ *-.+/g, "");
        $(`button[name='${i}']`).find('.song-title').html(pretty);
        $(`button[name='${i}']`).find('.song-artist').html(data[level].tracks[i].artists[0]);
    }
    $('.in-progress').addClass('in');
}

function parseResult(result) {
    if ($('button.song-option').hasClass('clicked') && $('.clicked').attr('name') === '0') {
        $('.clicked').addClass('done').find('.song-name').addClass("true");
        $('.quest').html('CORRECT!')
        return 1;
    } else {
        $('button[name="0"]').find('.song-name').addClass("true");
        $('button[name!="0"]').find('.song-name').addClass("false");
        $('button.song-option').addClass('done');
        $('button.song-option').hasClass('clicked') ? $('.quest').html('WRONG :(') : $('.quest').html('Too late!');
        return 0;
    }
}

$('.songs').on('click', 'button[name="0"]', () => {
    $('button[name="0"]').addClass('clicked');
    $('button[name!="0"]').removeClass('clicked');
});
$('.songs').on('click', 'button[name="1"]', () => {
    $('button[name="1"]').addClass('clicked');
    $('button[name!="1"]').removeClass('clicked');
});
$('.songs').on('click', 'button[name="2"]', () => {
    $('button[name="2"]').addClass('clicked');
    $('button[name!="2"]').removeClass('clicked');
});
$('.songs').on('click', 'button[name="3"]', () => {
    $('button[name="3"]').addClass('clicked');
    $('button[name!="3"]').removeClass('clicked');
});

function loadHtml() {
    for (let i = 0; i < 4; i++) {
        $('.songs').append(`
            <button class="song-option hvr-grow-shadow" type="button" name="${i}">
                <div class="song-name">
                    <div class="song-title"></div>
                    <div class="song-artist"></div>
                </div>
            </button>`);
    }
}


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loop() {
    const data = await $.get('/game/data');
    loadHtml();
    let score = 0;
    for (let level = 0; level < 10; level++) {
        displayPage(data, level);
        await timeout(10000);
        $('.in-progress').removeClass('in');
        score += parseResult();
        await timeout(2000);
    }
    await $.post('/game/score', { score: score });
    window.location.href = "/end";
}

loop();






