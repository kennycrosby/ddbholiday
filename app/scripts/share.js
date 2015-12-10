'use strict';

var api_key = "R_c5a205dfb9f18bebba3359508b9c32ff";
var login = "o_4ap51r11lp";

var share = share || {

  init : function() {

    var url = 'http://advent.ddbcalifornia.com/',
        title = 'DDB Ad-Vent Calendar ',
        desc = 'Giving you the GIF(t) of agency life.',
        image = url + 'images/facebook-share.jpg';

    var fbShareUrl = 
        'http://www.facebook.com/sharer.php?s=100&p[title]='+ 
        title + 
        '&p[summary]=' + 
        'DDB San Francisco is giving the greatest gif(t) of all: a reaction gif about ad agency life every day \'til Christmas. Check out the Ad-vent Calendar ' + 
        '&p[url]=' + 
        url + 
        '&p[images][0]=' + 
        image;

    var twShareUrl = 'http://twitter.com/intent/tweet?status='+
        'I\'m counting down the days until Gifmas with the DDB Ad-Vent Calendar (get it?) at '+
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

      console.log('http://advent.ddbcalifornia.com' + $(this).data('imgurl'));

      FB.ui({
          method: 'feed',
          link: url,
          caption: $(this).data('text'),
          picture: 'http://advent.ddbcalifornia.com' + $(this).data('imgurl')
        }, function(response){
          // console.log('done???', response)
        });

    });

    $(document.body).on('click', '.twsharecontent', function(e){
      e.preventDefault();

      var long_url = window.location.href;
      var postText = $(this).data('text');
      var regexp = new RegExp('#([^\\s]*)','g');
      postText = postText.replace(regexp, '');

      var winWidth = 520,
              winHeight = 350,
              winTop = (screen.height / 2) - (winHeight / 2),
              winLeft = (screen.width / 2) - (winWidth / 2);

      var win = window.open('about:blank', 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);

      $.getJSON("http://api.bitly.com/v3/shorten?callback=?", 
        { 
          "format": "json",
          "apiKey": api_key,
          "longUrl": long_url,
          "login": login
        },
        function(response) {
          
          var theURL;

          if (response.data.url) {
            theURL = encodeURIComponent(response.data.url);  
          } else {
            theURL = encodeURIComponent(window.location.href);
          }

          var twShareContentUrl = 'https://twitter.com/intent/tweet'+
              '?url='+
              theURL+
              '&text='+
              encodeURIComponent( postText )+
              '&hashtags='+
              'ddbsfadvent';

          win.location = twShareContentUrl;
        }
      );
      
    });

  }
}