var navbar = $('nav');
function setsearchpostion() {
    $('#qna').css('top', (navbar.height() + 11) + "px");
}
$(document).ready(function () {

    setsearchpostion();
    $('.sidebar li a, .sidebar button').click(function () {
        var divid = $(this).attr('id');
        $.ajax({
            url: '/' + divid,
            type: 'GET',
            cache: false,
        }).done(function (result) {
            $('#maincontent').html(result);
        });
    });
<<<<<<< HEAD
    $('.questioncard a').click(function () {
        $.ajax({
            url: '/question',
            type: 'GET',
            cache: false,
        }).done(function (result) {
            $('#maincontent').html(result);
        });
    });
=======

>>>>>>> e1fb5a165c4d1f1d6723749ead945b4d212f116b
});
