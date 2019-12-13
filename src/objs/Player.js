class GamePlayer extends GameObject {
	constructor(obj) {
		super(obj);
		this.config = {
			step: .13,
			velocity: 1
		}
	}

	moveUp() {
		this.y -= this.config.velocity * this.config.step * deltaTime;
	}

	moveLeft() {
		this.x -= this.config.velocity * this.config.step * deltaTime
	}

	moveRight() {
		this.x += this.config.velocity * this.config.step * deltaTime
	}

	moveDown() {
		this.y += this.config.velocity * this.config.step * deltaTime
	}

}
