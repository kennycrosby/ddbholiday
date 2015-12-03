'use strict';

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var snow = snow || {

  flakes : [],
  W : null,
  H : null,
  numberFlakes : 60,
  angle : 0,
  timer : '',

  makeit : function() {

    var self = this;

    self.W = $(document.body).width();
    self.H = $(document.body).height();
    canvas.width = self.W;
    canvas.height = self.H;
    self.angle = 0;
    self.numberFlakes = 60;

    if (self.timer) {
      clearInterval(self.timer);
    }

    ctx.clearRect(0, 0, self.W, self.H);

    self.flakes = [];
    for (var i = 0; i < self.numberFlakes; i++) {
      self.flakes.push({
        x: Math.random()*self.W,
        y: Math.random()*self.H,
        radius: Math.random()*8+1
      })
    }

    
    self.timer = setInterval(function(){
      self.drawFlakes();
    }, 30);  

  },

  moveFlakes : function() {
    var self = this;

    self.angle += 0.01;
    for (var i = 0; i < self.numberFlakes; i++) {
      var f = self.flakes[i];
      // cos and sin for moving diagonally
      f.y += Math.cos(self.angle) + 1 + f.radius/2;
      f.x += Math.sin(self.angle) * 2;

      //Start flakes over at top
      if (f.x > self.W+5 || f.x < -5 || f.y > self.H) {

        // Introduces some more random behavior to make the snowfall look real
        if (i%3 > 0) {
          self.flakes[i] = {x: Math.random()*self.W, y: -10, radius: f.radius};
        } else {
          // flake leaves from right
          if (Math.sin(self.angle) > 0) {
            // come in from left
            self.flakes[i] = {x: -5, y: Math.random()*self.H, radius: f.radius};
          } else {
            //come in from right
            self.flakes[i] = {x: self.W+5, y: Math.random()*self.H, radius: f.radius};
          }
        }
      }
    }
  },

  drawFlakes : function() {

    var self = this;
    // Have to clear it every time to redraw
    ctx.clearRect(0, 0, self.W, self.H);

    for (var i = 0; i < self.numberFlakes; i++) {
      var f = self.flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI*2, true);
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = f.radius / 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.stroke();
  
      // ctx.beginPath();
      // ctx.stroke();
      // ctx.closePath();
      // fractal([50,150], [500,150], 5);
      // fractal([270,490], [50,150],5);
      // fractal([500,150],[270,490],5);


    }
    
    self.moveFlakes();
  }

}


function fractal(A, B, depth){

    if (depth < 0){
        return null;
    }

    var C = divide(add(multiply(A, 2), B), 3);
    var D = divide(add(multiply(B, 2), A), 3);
    var F = divide(add(A, B), 2);
    
    var V1 = divide(minus(F, A), length(F, A));
    var V2 = [V1[1], -V1[0]];

    var E = add(multiply(V2, Math.sqrt(3)/6 * length(B, A)), F);

    DrawLine(A, B, "black");

    if (depth !=0){
        for (var i=0;i<10;i++)
            DrawLine(C, D, "white");
    };
    
    fractal(A, C, depth-1);
    fractal(C, E, depth-1);
    fractal(E, D, depth-1);
    fractal(D, B, depth-1);

};

function multiply(v, num){
    return [v[0]*num, v[1]*num];
};

function divide(v, num){
    return [v[0]/num, v[1]/num];
};
 
function add(a, b){
    return [a[0]+b[0], a[1]+b[1]];
};

function minus(a, b){
    return [a[0]-b[0], a[1]-b[1]];
};

function length(a, b){
    return Math.sqrt(Math.pow(a[0] - b[0],2) + 
                     Math.pow(a[1] - b[1],2));
};

function DrawLine(a, b, c){
    ctx.beginPath();
    ctx.strokeStyle = c;
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
    ctx.closePath();
};