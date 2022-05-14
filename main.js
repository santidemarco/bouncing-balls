let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let heigth = canvas.height = window.innerHeight;

let balls = [];

const randomNumber = (min, max) => {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num
};

class Ball {
    constructor(
        x,
        y,
        velX,
        velY,
        color,
        size,
    ) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    //metodo para dibujar las pelotas
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = - (this.velX);
        }

        if ((this.x + this.size) <= 0) {
            this.velX = - (this.velX);
        }
        if ((this.y + this.size) >= heigth) {
            this.velY = -(this.velY);
        }

        if ((this.y + this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetected() {
        for (var j = 0; j < balls.length; j++) {

            if (!(this === balls[j])) {
                var dx = this.x - balls[j].x;
                var dy = this.y - balls[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color =
                        balls[j].color = this.color = 'rgb(' + randomNumber(0, 255) + ',' + randomNumber(0, 255) + ',' + randomNumber(0, 255) + ')';
                }
            }
        }

    }

}

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, heigth);

    while (balls.length < 30) {
        var size = randomNumber(10, 20);
        var ball = new Ball(
            randomNumber(0 + size, width - size),
            randomNumber(0 + size, heigth - size),
            randomNumber(-7, 7),
            randomNumber(-7, 7),
            'rgb(' + randomNumber(0, 255) + ',' + randomNumber(0, 255) + ',' + randomNumber(0, 255) + ')',
            size,
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetected();
    }
    requestAnimationFrame(loop);
}

loop();