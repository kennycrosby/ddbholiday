'use strict';

var share = share || {

  init : function() {

    var url = 'http://kennycrosby.com/',
        title = 'DDB Ad-Vent Calendar ',
        desc = 'Giving you the GIF(t) of agency life.',
        image = url + 'images/facebook-share.jpg';

    var fbShareUrl = 
        'http://www.facebook.com/sharer.php?s=100&p[title]='+ 
        title + 
        '&p[summary]=' + 
        desc + 
        '&p[url]=' + 
        url + 
        '&p[images][0]=' + 
        image;

    var twShareUrl = 'http://twitter.com/intent/tweet?status='+
        title+
        url;
    
    $(document.body).on('click', '.fbsharesite', function(e){
      e.preventDefault();

      var winWidth = 520,
          winHeight = 350,
          winTop = (screen.height / 2) - (winHeight / 2),
          winLeft = (screen.width / 2) - (winWidth / 2);

      window.open(fbShareUrl, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    });

    $(document.body).on('click', '.twsharesite', function(e){
      e.preventDefault();

      var winWidth = 520,
          winHeight = 350,
          winTop = (screen.height / 2) - (winHeight / 2),
          winLeft = (screen.width / 2) - (winWidth / 2);

      window.open(twShareUrl, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    });

    // Share specific content
    $(document.body).on('click', '.fbsharecontent', function(e){
      e.preventDefault();

      var url = window.location.href;
      FB.ui({
          method: 'feed',
          link: url,
          caption: $(this).data('text'),
          picture: $(this).data('imgurl')
        }, function(response){
          console.log('done???', response)
        });

    });

    $(document.body).on('click', '.twsharecontent', function(e){
      e.preventDefault();
      sendTweet(this);
    });

  }
}

function sendTweet(clickedEl) {

  var url = window.location.href;
  var twShareContentUrl = 'https://twitter.com/intent/tweet'+
          '?url='+
          encodeURIComponent(url)+
          '&text='+
          encodeURIComponent( $(clickedEl).data('text') )+
          '&hashtags='+
          'ddbsfadvent';

  var winWidth = 520,
      winHeight = 350,
      winTop = (screen.height / 2) - (winHeight / 2),
      winLeft = (screen.width / 2) - (winWidth / 2);

  window.open(twShareContentUrl, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);

}