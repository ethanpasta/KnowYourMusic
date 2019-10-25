function sendFinal(name) {
    return $.post('/game', { name: name }).then(data => {
        return data;
    }).catch(err => {
        return err;
    });
}
function getData() {
    return $.get('/game/data').then(data => {
        return data;
    });
}

function displayPage(data, level) {
    $('.line').html(data[level].line);
    for (let i = 1; i <= 4; i++) {
        $('button[name="option1' + i + '"]').html(data[level].tracks[i - 1]);
    }
}

let level = 0;

const sleep = (milliseconds) => {
    // display timer here
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function pageLoop() {
    const data = await getData();
    for (let i = 0; i < 10; i++) {
        displayPage(data, i);
        await sleep(10000);
        
    }
}


$('button').click(function () {
    const $this = $(this);
    const name = $this.attr('name');
    console.log("name is: " + name);
    $("button[name!='" + name + "']").prop("disabled", true);
    $this.addClass('clicked');
    sendFinal(name).then(data => {
        if (data) { $this.addClass('success') }
        else { $this.addClass('failed') }
    }).catch(err => { alert(err) });
})






