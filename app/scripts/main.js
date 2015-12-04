'use strict';

var app = app || {

  kickoff : function() {

    $.routes.add('/day/{id:int}/', function(){
      var date = this.id;
      $(document.body).on('all-loaded', function(){
        cal.setModal(date);
      });
    });

    cal.init();    
    share.init();

    var handheld = utils.presumeHandheld();
    if (!handheld) this.desktopFeatures();

    // var $dates = $('.cal').find('.col-lg-1.date');
    // $(window).resize(function(){

    //   var width = $dates.find('.ch-item').css('width');
    //   console.log(width);
    //   $dates.find('.ch-item').height(width);

    // });

  },

  desktopFeatures : function() {

    snow.makeit();

    var dbFunc = debounce(function() {
      snow.makeit();
    }, 250);

    window.addEventListener('resize', dbFunc);

    $('.footer').parallaxify({
      positionProperty: 'transform',
      responsive: true,
      motionType: 'natural',
      mouseMotionType: 'gaussian',
      motionAngleX: 80,
      motionAngleY: 80,
      alphaFilter: 0.5,
      adjustBasePosition: true,
      alphaPosition: 0.025,
    });

  }

};

// Start Everything
app.kickoff();



String.prototype.parseHashtag = function() {
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
    var tag = t;
    return '<a href="https://www.instagram.com/explore/tags/'+ tag + '" target="_blank">' + tag + '</a>';
  });
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
