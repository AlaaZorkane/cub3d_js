class GamePlayer extends GameObject {
	constructor(obj) {
		super(obj);
		this.config = {
			step: .13,
			velocity: 1
		}
	}
	extraRender() {
		stroke("red");
		line(
			this.x,
			this.y,
			this.x + Math.cos(this.rotation.angle) * 30,
			this.y + Math.sin(this.rotation.angle) * 30
		);
	}

	rotateRight() {
		this.rotation.angle += this.rotation.speed * deltaTime;
	}

	rotateLeft() {
		this.rotation.angle -= this.rotation.speed * deltaTime;
	}

	moveForward() {
		const speed = this.config.velocity * this.config.step * deltaTime
		const newPlayer = {
			x: this.x + Math.cos(this.rotation.angle) * speed,
			y: this.y + Math.sin(this.rotation.angle) * speed,
			radius: this.radius
		}
		if (!doesColide(newPlayer, { map: true })) {
			this.x = newPlayer.x;
			this.y = newPlayer.y;
		}
	}

	moveRight() {
		const speed = this.config.velocity * this.config.step * deltaTime
		const newPlayer = {
			x: this.x - Math.cos(this.rotation.angle - PI / 2) * speed,
			y: this.y - Math.sin(this.rotation.angle - PI / 2) * speed,
			radius: this.radius
		}
		if (!doesColide(newPlayer, { map: true })) {
			this.x = newPlayer.x;
			this.y = newPlayer.y;
		}
	}

	moveBackward() {
		const speed = this.config.velocity * this.config.step * deltaTime
		const newPlayer = {
			x: this.x - Math.cos(this.rotation.angle) * speed,
			y: this.y - Math.sin(this.rotation.angle) * speed,
			radius: this.radius
		}
		if (!doesColide(newPlayer, { map: true })) {
			this.x = newPlayer.x;
			this.y = newPlayer.y;
		}
	}

	moveLeft() {
		const speed = this.config.velocity * this.config.step * deltaTime
		const newPlayer = {
			x: this.x - Math.cos(this.rotation.angle + PI / 2) * speed,
			y: this.y - Math.sin(this.rotation.angle + PI / 2) * speed,
			radius: this.radius
		}
		if (!doesColide(newPlayer, { map: true })) {
			this.x = newPlayer.x;
			this.y = newPlayer.y;
		}
	}
}
