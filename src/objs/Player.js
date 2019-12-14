class GamePlayer extends GameObject {
	constructor(obj) {
		super(obj);
		this.config = {
			step: .13,
			velocity: 1
		}
	}
	moveUp() {
		const speed = this.config.velocity * this.config.step * deltaTime
		const newPlayerY = this.y - speed;
		console.log(this.collision.up)
		if (this.collision.up.length) {
			this.collision.up.forEach(obj => {
				if (obj.tileType == 1) {
					obj.y *= obj.tileSize;
					if (newPlayerY < obj.y)
						this.y = newPlayerY;
					console.log(obj.y, newPlayerY)
				}
			});
		} else
			this.y = newPlayerY;
	}

	moveRight() {
		const speed = this.config.velocity * this.config.step * deltaTime
		const newPlayerX = this.x + speed;
		if (this.collision.right.length) {
			this.collision.right.forEach(obj => {
				if (obj.tileType == 1) {
					obj.x *= obj.tileSize;
					if (newPlayerX > obj.x)
						this.x = newPlayerX;
					console.log(obj.x, newPlayerX)
				}
			});
		} else
			this.x = newPlayerX
	}

	moveDown() {
		const speed = this.config.velocity * this.config.step * deltaTime
		const newPlayerY = this.y + speed;
		if (this.collision.down.length) {
			this.collision.down.forEach(obj => {
				if (obj.tileType == 1) {
					obj.y *= obj.tileSize;
					if (newPlayerY > obj.y)
						this.y = newPlayerY;
				}
			});
		} else
			this.y = newPlayerY
	}

	moveLeft() {
		const speed = this.config.velocity * this.config.step * deltaTime
		const newPlayerX = this.x - speed;
		if (this.collision.left.length) {
			this.collision.left.forEach(obj => {
				if (obj.tileType == 1) {
					obj.x *= obj.tileSize;
					if (newPlayerX < obj.x)
						this.x = newPlayerX;
					console.log(obj.x, newPlayerX)
				}
			});
		} else
			this.x = newPlayerX
	}
}
