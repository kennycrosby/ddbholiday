'use strict';

var app = app || {

  kickoff : (function() {

    $.routes.add('/day/{id:int}/', function(){
      console.log('fart', this.id);
      var date = this.id;

      $(document.body).on('all-loaded', function(){
        console.log('ALL LOADED');
        cal.setModal(date);
      });
      
    });

    cal.init();
    snow.makeit();
    share.init();

  })()

};

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

String.prototype.parseHashtag = function() {
  return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
    var tag = t;
    return '<a href="https://www.instagram.com/'+ tag + '" target="_blank">' + tag + '</a>';
  });
};




