const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const scoreContainer = document.querySelector(".score-container");
const score = document.getElementById("score");

canvas.height = 680;
canvas.width = 1300;

//ant constatnts
const MAX_ANT_VELOCITY = 3;
const MIN_ANT_VELOCITY = -3;
const MAX_ANT_SIZE = 40;
const MIN_ANT_SIZE = 30;
const NUMBER_OF_ANTS = 35;
const MASS = 1;

//a

//ants array
let ants = [];

//ant class
function Ant(x, y, radius, xVelocity, yVelocity, mass = MASS) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.velocity = {
		x: xVelocity,
		y: yVelocity,
	};
	this.img = new Image();
	this.img.src = "https://sajagshrestha.github.io/ant-smasher/assets/ant.png";
	this.mass = mass;

	//draw ant to canvas
	this.drawAnt = () => {
		context.drawImage(this.img, this.x, this.y, this.radius, this.radius);
	};

	//update ant position after each repaint
	this.updateAnt = () => {
		// detect collison with other ants
		for (let i = 0; i < ants.length; i++) {
			if (this === ants[i]) continue;
			if (detectedCollisionBetween(this, ants[i])) {
				resolveCollision(this, ants[i]);
			}
		}

		//detect collision with container
		if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
			this.velocity.x = -this.velocity.x;
		}
		if (
			this.y - this.radius <= 0 ||
			this.y + this.radius >= canvas.height
		) {
			this.velocity.y = -this.velocity.y;
		}

		this.drawAnt();
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};
}

//create ants
for (i = 0; i < NUMBER_OF_ANTS; i++) {
	let radius = generateRandomIntegerBetween(MIN_ANT_SIZE, MAX_ANT_SIZE);
	let x = generateRandomIntegerBetween(radius, canvas.width - radius);
	let y = generateRandomIntegerBetween(radius, canvas.height - radius);
	let yVelocity = generateRandomIntegerBetween(
		MIN_ANT_VELOCITY,
		MAX_ANT_VELOCITY
	);
	let xVelocity = generateRandomIntegerBetween(
		MIN_ANT_VELOCITY,
		MAX_ANT_VELOCITY
	);

	//prevent ants form generating on top of ech other
	if (i !== 0) {
		for (let j = 0; j < ants.length; j++) {
			if (
				detectedCollisionBetween(
					new Ant(x, y, radius, xVelocity, yVelocity),
					ants[j]
				)
			) {
				x = generateRandomIntegerBetween(radius, canvas.width - radius);
				y = generateRandomIntegerBetween(
					radius,
					canvas.height - radius
				);

				j = -1;
			}
		}
	}
	ants.push(new Ant(x, y, radius, xVelocity, yVelocity));
}

let scoreValue = 0;
canvas.addEventListener("click", (event) => {
	let rect = canvas.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	ants.forEach((ant, index) => {
		if (
			x >= ant.x &&
			x <= ant.x + ant.radius * 2 &&
			y >= ant.y &&
			y <= ant.y + ant.radius * 2
		) {
			scoreValue++;
			if (scoreValue === NUMBER_OF_ANTS) {
				scoreContainer.innerHTML = "YOU MONSTER!";
			}
			score.innerHTML = scoreValue;
			ant.img.src =
				"https://sajagshrestha.github.io/ant-smasher/assets/dead-ant.png";
			ant.velocity.x = 0;
			ant.velocity.y = 0;
			const splatSound = new Audio(
				"https://sajagshrestha.github.io/ant-smasher/assets/splat.mp3"
			);
			splatSound.volume = 0.2;
			splatSound.play();
			setTimeout(() => ants.splice(index, 1), 200);
		}
	});
});

function animate() {
	requestAnimationFrame(animate);

	//clear canvas after each repaint
	context.clearRect(0, 0, canvas.width, canvas.height);

	//update ants in each repaint
	ants.forEach((ant) => {
		ant.updateAnt();
	});
}

animate();
