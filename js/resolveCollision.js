//rotate the velocity to make collision 1D
const rotate = (velocity, angle) => {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
	};

	return rotatedVelocities;
};

//bounce effect
const resolveCollision = (ballOne, ballTwo) => {
	const xVelocityDiff = ballOne.velocity.x - ballTwo.velocity.x;
	const yVelocityDiff = ballOne.velocity.y - ballTwo.velocity.y;

	const xDist = ballTwo.x - ballOne.x;
	const yDist = ballTwo.y - ballOne.y;

	// Prevent accidental overlap of balls if they are not moving in same direction
	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
		//angle of collision
		const angle = -Math.atan2(ballTwo.y - ballOne.y, ballTwo.x - ballOne.x);

		//mass of the balls
		const m1 = ballOne.mass;
		const m2 = ballTwo.mass;

		// Rotate the initial velocity just before collision
		const u1 = rotate(ballOne.velocity, angle);
		const u2 = rotate(ballTwo.velocity, angle);

		//Velocity after 1D collision
		const v1 = {
			x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
			y: u1.y,
		};
		const v2 = {
			x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
			y: u2.y,
		};

		// Final velocity after rotating back to original position
		const finalVelocityOne = rotate(v1, -angle);
		const finalVelocityTwo = rotate(v2, -angle);

		//update velocities
		ballOne.velocity.x = finalVelocityOne.x;
		ballOne.velocity.y = finalVelocityOne.y;

		ballTwo.velocity.x = finalVelocityTwo.x;
		ballTwo.velocity.y = finalVelocityTwo.y;
	}
};
