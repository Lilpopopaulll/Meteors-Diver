const canvas = document.getElementById('playground');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 15,
    height: 25,
    angle: 0,
    speed: 0,
    maxSpeed: 4,
    rotationSpeed: 0,
    thrust: 0
};

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

document.addEventListener('keydown', (e) => {
    if (e.key in keys) keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    if (e.key in keys) keys[e.key] = false;
});

function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.angle);
    ctx.fillStyle = 'purple';

    ctx.beginPath();
    ctx.moveTo(-ship.width / 2, -ship.height / 2);
    ctx.lineTo(ship.width / 2, -ship.height / 2);
    ctx.lineTo(ship.width / 3, 0);
    ctx.lineTo(ship.width / 2, ship.height / 2);
    ctx.lineTo(-ship.width / 3, ship.height / 2);
    ctx.lineTo(-ship.width / 2, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

function updateShip() {
    if (keys.ArrowUp) ship.thrust = 0.2;
    else if (keys.ArrowDown) ship.thrust = -0.2;
    else if (ship.speed > 0) ship.thrust = -0.2;
    else ship.thrust = 0;

    if (keys.ArrowLeft) ship.rotationSpeed = -0.08;
    else if (keys.ArrowRight) ship.rotationSpeed = 0.08;
    else ship.rotationSpeed = 0;

    ship.angle += ship.rotationSpeed;
    if (ship.speed < ship.maxSpeed) ship.speed += ship.thrust;
    else if (ship.speed < 0) ship.speed = 0;
    else ship.speed = ship.maxSpeed - 0.1;

    let newX = ship.x + Math.cos(ship.angle) * ship.speed;
    let newY = ship.y + Math.sin(ship.angle) * ship.speed;

    if (newX > canvas.width) newX = canvas.width
    else if (newX < 0) newX = 0
    if (newY > canvas.height) newY = canvas.height
    else if (newY < 0) newY = 0

    ship.x = newX;
    ship.y = newY;

}





//----------------------------------------  METEORS  ---------------------------------------------

class Meteor {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.size = Math.floor(Math.random() * (40 - 10) + 10);
        this.x = this.getRandomOffscreenPosition();
        this.y = 0;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.floor(Math.random() * (4 - 1) + 1);
        this.directionX = Math.cos(this.angle);
        this.directionY = Math.sin(this.angle);
        this.vertices = this.generateVertices();
    }

    getRandomOffscreenPosition() {
        const position = Math.random() * 2 * (canvas.width + canvas.height);
        return position - (canvas.width + canvas.height) / 2;
    }

    generateVertices() {
        const vertices = [];
        const numVertices = Math.floor(Math.random() * (16 - 5) + 5);

        for (let i = 0; i < numVertices; i++) {
            const angle = (i / numVertices) * 2 * Math.PI;
            const radius = this.size + (Math.random() * this.size / 2);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            vertices.push({ x, y });
        }

        return vertices;
    }

    update() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
    }

    colliding() {
        return (
            this.x < ship.x + ship.width &&
            this.x + this.size > ship.x &&
            this.y < ship.y + ship.height &&
            this.y + this.size > ship.y
        );
    }


}

function drawMeteor(meteor) {
    meteor.ctx.save();
    meteor.ctx.translate(meteor.x, meteor.y);
    meteor.ctx.rotate(meteor.angle);
    meteor.ctx.fillStyle = '#808080';
    meteor.ctx.beginPath();
    meteor.vertices.forEach((vertex, index) => {
        if (index === 0) {
            meteor.ctx.moveTo(vertex.x, vertex.y);
        } else {
            meteor.ctx.lineTo(vertex.x, vertex.y);
        }
    });

    meteor.ctx.closePath();
    meteor.ctx.stroke();
    meteor.ctx.fill();
    meteor.ctx.restore();
}

let meteors = [];

function addMeteor() {
    let meteor = new Meteor(canvas);
    meteors.push(meteor);
}

function spawnMeteors() {
    meteors.forEach((meteor, index) => {
        meteor.update();
        drawMeteor(meteor);
        if (meteor.colliding()) {
            meteors.splice(index, 1);
            vies--
            setVies.innerHTML = vies

        }
    });
}



//------------------------------------- Tir ---------------------------------------------

class Missile {
    constructor(canvas, ship) {
        this.ctx = canvas.getContext('2d');
        this.x = ship.x;
        this.y = ship.y;
        this.angle = ship.angle;
        this.directionX = Math.cos(this.angle);
        this.directionY = Math.sin(this.angle);
        this.speed = 8;
    }

    update() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
    }

    colliding(num) {
        meteors.forEach((meteor, index) => {
            if (this.checkColliding(meteor)) {
                meteors.splice(index, 1)
                scores.push(0)
                setScore.innerHTML = scores.length
                missiles.splice(num, 1)

                return true
            }
        })
    }
    checkColliding(meteor) {
        return (
            this.x < meteor.x + meteor.size + meteor.size / 4 &&
            this.x + 4 > meteor.x &&
            this.y < meteor.y + meteor.size + meteor.size / 4 &&
            this.y + 4 > meteor.y
        );
    }
}

let missiles = [];
let vies = 3

let setVies = document.getElementById('vies')
setVies.innerHTML = vies


function tir() {
    let missile = new Missile(canvas, ship);
    missiles.push(missile);
}

function spawnTirs() {
    missiles.forEach((missile, index) => {
        missile.update();
        drawMissile(missile);
        if (missile.x < 0 || missile.x > canvas.width || missile.y < 0 || missile.y > canvas.height) {
            missiles.splice(index, 1);
        }
        missile.colliding(index)

    });
}

let spacePressed = false;

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !spacePressed) {
        spacePressed = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.code === 'Space' && spacePressed) {
        spacePressed = false;
        tir();
    }
});

function drawMissile(missile) {
    missile.ctx.save();
    missile.ctx.translate(missile.x, missile.y);
    missile.ctx.rotate(missile.angle);
    missile.ctx.fillStyle = 'red';
    missile.ctx.beginPath();
    missile.ctx.arc(0, 0, 3, 0, 2 * Math.PI);
    missile.ctx.fill();
    missile.ctx.restore();
}

//------------------------------------ FOND ETOILE ----------------------------------------
let etoiles = [];
let scores = [];

var setScore = document.getElementById('score')
setScore.innerHTML = scores.length


class Etoile {
    constructor(canvas) {
        this.x = Math.floor(Math.random() * window.innerWidth);
        this.y = Math.floor(Math.random() * window.innerHeight);
        this.ctx = canvas.getContext('2d');
        this.radius = Math.random() * 2
    }

    update() {

    }
}

function initEtoile() {
    for (let i = 0; i < 100; i++) {
        etoiles[i] = new Etoile(canvas);
    }
}

function drawEtoiles(etoile) {
    etoile.ctx.save();
    etoile.ctx.translate(etoile.x, etoile.y);
    etoile.ctx.fillStyle = 'white';
    etoile.ctx.beginPath();
    etoile.ctx.arc(0, 0, etoile.radius, 0, 2 * Math.PI);
    etoile.ctx.fill();
    etoile.ctx.restore();
}

function spawnEtoiles() {
    etoiles.forEach((etoile) => {
        etoile.update();
        drawEtoiles(etoile);
    });
}

// ------------------------------------ LOOP ----------------------------------------
initEtoile();
function startMeteorSpawner() {
    setInterval(addMeteor, 800);
}

function checkLife() {
    if (vies <= 0) {
        console.log("Done")
        window.location.href = "lose.html";
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkLife()
    spawnEtoiles();
    updateShip();
    drawShip();
    spawnMeteors();
    spawnTirs();
    requestAnimationFrame(gameLoop);
}

startMeteorSpawner();
gameLoop();
