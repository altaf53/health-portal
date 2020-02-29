var navbar = $('nav');
function setsearchpostion(){
    $('#qna').css('top', (navbar.height()+11)+"px");
}
$(document).ready(function(){
    setsearchpostion();
});