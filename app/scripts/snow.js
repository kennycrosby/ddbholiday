'use strict';

var snow = snow || {

  makeit : function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var W = $(document.body).width();
    var H = $(document.body).height();
    canvas.width = W;
    canvas.height = H;

    var numberFlakes = 60;
    var flakes = [];
    for (var i = 0; i < numberFlakes; i++) {
      flakes.push({
        x: Math.random()*W,
        y: Math.random()*H,
        radius: Math.random()*8+1
      })
    }

    function drawFlakes() {
      // Have to clear it every time to redraw
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < numberFlakes; i++) {
        var f = flakes[i];
        ctx.moveTo(f.x, f.y);
        // ctx.arc(f.x, f.y, f.radius, 0, Math.PI*2, true);
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, 2 * Math.PI, true);
        ctx.lineWidth = f.radius / 1.5;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.stroke();
      }
      
      
      moveFlakes();
    }

    var angle = 0;
    function moveFlakes() {
      angle += 0.01;
      for (var i = 0; i < numberFlakes; i++) {
        var f = flakes[i];
        // cos and sin for moving diagonally
        f.y += Math.cos(angle) + 1 + f.radius/2;
        f.x += Math.sin(angle) * 2;

        //Start flakes over at top
        if (f.x > W+5 || f.x < -5 || f.y > H) {

          // Introduces some more random behavior to make the snowfall look real
          if (i%3 > 0) {
            flakes[i] = {x: Math.random()*W, y: -10, radius: f.radius};
          } else {
            // flake leaves from right
            if (Math.sin(angle) > 0) {
              // come in from left
              flakes[i] = {x: -5, y: Math.random()*H, radius: f.radius};
            } else {
              //come in from right
              flakes[i] = {x: W+5, y: Math.random()*H, radius: f.radius};
            }
          }
        }
      }
    }

    function init() {
      drawFlakes();
    }

    setInterval(init, 30);  

  }

}