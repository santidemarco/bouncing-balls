//obtenemos una referencia al objeto canvas
let canvas = document.querySelector("canvas");

//lamamos al metodo getContext para definir el contexto en el cual se comienza a dibujar.
//el resultado de la variable ctx es sl objeto que representa directamente el area de dibujo.
let ctx = canvas.getContext("2d");

//corresponden al alto y ancho del elemento canvas, coinciden con el alto y ancho del navegador, obteniendo los valores directamente de innerWidth e innerHeight.
let width = canvas.width = window.innerWidth;
let heigth = canvas.height = window.innerHeight;

//retorna un numero aleatorio 
const randomNumber = (min, max) => {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num
};

//forma usando prototimos 
//nuestro programa tendra montones de pelotas rebotando,
//y como todas las pelotas tendran el mismo comportamiento las representaremos con un unico objeto prototipo.

//prototipo de las pelotas del programa
function Ball(x, y, velX, velY, color, size) {
    this.x = x; //posicion en horizontal
    this.y = y; //posicion en vertical
    this.velX = velX; //velocidad horizontal
    this.velY = velY; //velocidad vertical
    this.color = color; //color
    this.size = size; //tamano
}

//realizamos los metodos para que nuestras peloteas realicen cosas dentro de nuestro programa.

//estamos agregando el metodo draw al prototipo Ball.
Ball.prototype.draw = function () {
    ctx.beginPath(); //para declarar que empezamos a dibujar una forma en el canvas.
    ctx.fillStyle = this.color; //para definir el color de la forma y lo hacemos coincidir con color.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //x e y muestran las coordenadas donde empieza el arco, size es el radio de la circunferencia.
    ctx.fill();//finalioza el dibujo y rellena el area de la curva con el color fillstyle.
}

//Actualizando los datos de la pelota 
//
//las cuatro primeras partes verifican si la pelota ha alcanzado el borde del canvas, de ser asi se invierte la direccion de la velocidad(movimiento).
Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = - (this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y - this.size) >= heigth) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}


Ball.prototype.collisionDetected = function () {

    for (var j = 0; j < balls.length; j++) {

        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);


            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + randomNumber(0, 255) + ',' + randomNumber(0, 255) + ',' + randomNumber(0, 255) + ')';

            }
        }
    }
}

//animando las pelotas  
let balls = [];

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