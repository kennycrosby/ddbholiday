'use strict';

// Get all the date divs
var $dates = $('div.date');
var source   = $("#modal-template").html();
var template = Handlebars.compile(source);

var cal = cal || {

  allGrams : {},

  init : function() {

    var self = this;
    var currentDate = self.whichDay();
    var daysSoFar = currentDate;

    self.binds();

    // Add classes to the current date and passed dates
    $dates.each(function(index, date) {
      var $date = $(date);
      $(date).find('.ch-item').attr('data-date', index+1);

      if (index+1 < currentDate) {
        $date.addClass('passed');
      } else if (index+1 === currentDate) {
        $date.addClass('active passed');
      }
    });

    // Get the instagram data
    var get = getData();
    get.then(function(grams){
      self.allGrams = grams;
      self.popData(grams);
      $(document.body).trigger({
        type: 'all-loaded'
      });
    });

  },

  binds : function() {
    
    var self = this;

    $(document.body).on('click', '.passed .ch-item', function(){
      $(this).addClass('open');
      var clickedDate = $(this).data('date');
      if (self.allGrams[clickedDate-1] ) {
        self.setModal(clickedDate);  
      };
    });

    $('#modal').on('shown.bs.modal', function () {
      var vid = document.getElementById('videocontainer');
      $('video').one('canplay', function(){
        $('.modal-dialog').css('height', $('.modal-dialog').outerHeight() + 100 );  
      });
      
    });

    $('#modal').on('hidden.bs.modal', function () {
      $('.ch-item').removeClass('open');
      // $('.modal').css('height', 'auto');
      var vid = document.getElementById('videocontainer'); 
      vid.pause();
      window.location.hash = '/';
    });

  },

  setModal : function(date) {
    window.location.hash = '/day/'+date;
    var self = this;
    var currentGram = self.allGrams[date-1];

    if (currentGram) {
      var context = { 
        date: pad(date), 
        videoUrl: currentGram.videos.standard_resolution.url, 
        imageUrl: currentGram.images.standard_resolution.url, 
        caption: currentGram.caption.text.parseHashtag(),
        captionPlain: currentGram.caption.text
      };
      var html    = template(context);
      $('.modal-content').html(html);
      $('#modal').modal('show');
    } else {

    }
  },

  popData : function(grams) {

    for(var i = 0; i < grams.length; i++) {
      var dateEl = $dates[i];
      $(dateEl).find('.ch-info-wrap').css({
        'background-image': 'url(' + grams[i].images.low_resolution.url + ')'
      });
    }

  },

  whichDay : function() {

    var d = new Date();
    var m = d.getMonth();
    var n = d.getDate();

    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    if (m === 11) {
      return n;
    } else {
      return 25;
    }

    return 20;

  }
}

function getData() {

  var client_id = '68e4108b43354b028b96be615901fab1';
  var tag = 'ddbsfadvent';
  var gramUrl = 'https://api.instagram.com/v1/tags/' + tag +'/media/recent?';
  var requestData = { client_id: client_id, count: 25 };

  var dfd = $.Deferred();

  $.ajax({
      url: gramUrl,
      type: 'GET',
      dataType: 'jsonp',
      data: requestData
    }).success(function(response) {

      var data = response.data.reverse();
      dfd.resolve( data );

    }).error(function(xhr, status, err){
      console.log('Error getting the data: ', err.toString());
      dfd.reject();
    });

    return dfd.promise();

}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
