var navbar = $('nav');
function setsearchpostion(){
    $('#qna').css('top', (navbar.height()+11)+"px");
}
$(document).ready(function(){
    
    setsearchpostion();
    $('.sidebar li a, .sidebar button').click(function(){
        var divid = $(this).attr('id');
        $.ajax({
            url: '/'+divid,
            type: 'GET',
            cache: false,
        }).done(function(result){
            $('#maincontent').html(result);
        });
    });
    
});