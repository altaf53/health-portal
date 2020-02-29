var navbar = $('nav');
function setsearchpostion(){
    $('#qna').css('top', (navbar.height()+11)+"px");
}
window.addEventListener('load', () => {
    
    registerSW();
  });
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


async function registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('pwabuilder-sw.js');
      } catch (e) {
        console.log(`SW registration failed`);
      }
    }
  }


//  // This is the service worker with the Advanced caching

// // Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

// // Check compatibility for the browser we're running this in
// if ("serviceWorker" in navigator) {
//     if (navigator.serviceWorker.controller) {
//       console.log("[PWA Builder] active service worker found, no need to register");
//     } else {
//       // Register the service worker
//       navigator.serviceWorker
//         .register("pwabuilder-sw.js", {
//           scope: "./"
//         })
//         .then(function (reg) {
//           console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
//         });
//     }
//   }