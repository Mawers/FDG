var Catcher;
var myObstacles = [];

function startGame() {
    myGameArea.start();
    Catcher = new component(144, 1, "red", 328, 515)
    myObstacle = new component(2, 2, "green", 300, 240)
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
          })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
      }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
      }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
}

function stopMove() {
    Catcher.speedX = 0;
  }


function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
      if (Catcher.crashWith(myObstacles[i])) {
        myGameArea.stop();
        return;
      }
    }
    myGameArea.clear();
    Catcher.speedX = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {Catcher.speedX = -5; }
    if (myGameArea.keys && myGameArea.keys[39]) {Catcher.speedX = 5; }
    myGameArea.frameNo += 1;
    
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minX = 20;
        maxX = 780;
        X = Math.floor(Math.random()*(maxX-minX+1)+minX);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
      }
    for (i = 0; i < myObstacles.length; i += 1) {
      myObstacles[i].y += -5;
      myObstacles[i].update();
    }
    Catcher.newPos();
    Catcher.update();
  }