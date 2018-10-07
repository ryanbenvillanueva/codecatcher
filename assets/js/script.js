var myGamePiece;
var myBackground;
var server;

var codeArray = [];


startGame = () => {
    myGamePiece = new component(50, 50, "./assets/img/catcher.png", 225, 450, "image");
    myBackground = new component(500, 400, "./assets/img/background.jpg", 0, 100, "image");
    server = new component(500, 100, "./assets/img/server.png", 0, 0, "image");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

const everyinterval = (n) => {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
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

const updateGameArea = () => {
    myGameArea.clear();
    // myBackground.newPos();
    myBackground.update();
    myGamePiece.newPos();
    myGamePiece.update();
    // server.newPos();
    server.update();
    myGameArea.frameNo += 1;
    let col, maxPosition, minPosition;


    if (myGameArea.frameNo == 1 || everyinterval(100)) {
        minPosition = 0;
        maxPosition = 450;
        col = Math.floor(Math.random() * (maxPosition - minPosition + 1) + minPosition)
        codeArray.push(new component(50, 50, "./assets/img/code.png", col, 0, "image"));
    }
    for (i = 0; i < codeArray.length; i += 1) {
        codeArray[i].y += 7;
        codeArray[i].update();
    }

    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if ((myGameArea.key && myGameArea.key == 37) && (myGamePiece.x > 0)) {
        myGamePiece.speedX = -5;
    }
    if ((myGameArea.key && myGameArea.key == 39) && (myGamePiece.x < 500 - myGamePiece.width)) {
        myGamePiece.speedX = 5;
    }

}