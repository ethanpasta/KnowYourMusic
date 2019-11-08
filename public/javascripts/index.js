/**
 * Changes start to 'loading' on click
 */
$('.start-game').click(function () {
    const $this = $(this);
    $this.prop('disabled', true);
    $this.removeClass('hvr-grow-shadow');
    const load = '<span class="align-middle spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  Loading...';
    $this.html(load);
});