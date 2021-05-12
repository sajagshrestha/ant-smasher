function generateRandomIntegerBetween(minValue, maxValue) {
	return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

function claculateDistance(x1, y1, x2, y2) {
	let dx = x2 - x1;
	let dy = y2 - y1;
	return Math.sqrt(dx * dx + dy * dy);
}

function detectedCollisionBetween(ballOne, ballTwo) {
	const distance = claculateDistance(
		ballOne.x,
		ballOne.y,
		ballTwo.x,
		ballTwo.y
	);
	if (distance <= ballOne.radius + ballTwo.radius) return true;
	return false;
}
