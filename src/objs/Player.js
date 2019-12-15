class GamePlayer extends GameObject {
	constructor(obj) {
		super(obj);
		this.weapon = {
			_id:"hand"
		};
		this.weapon_lastused = 0;
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
		const speed = this.velocity * this.step * deltaTime
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
		const speed = this.velocity * this.step * deltaTime
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
		const speed = this.velocity * this.step * deltaTime
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
		const speed = this.velocity * this.step * deltaTime
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

	equipWeapon(weapon) {
		this.weapon = game.store.projectiles[weapon]
	}


	shoot() {
		if (this.weapon._id != "hand") {
			let delay = Date.now() - this.weapon_lastused;
			if(this.weapon.cooldown <  delay) {
				this.weapon_lastused = Date.now();
				let rotation = JSON.parse(JSON.stringify(this.rotation));
				let projectile_info = Object.assign({}, this.weapon, { x: this.x, y: this.y, rotation: rotation, owner:this});
				let projectile = new GameProjectile(projectile_info);
				game.objects.projectiles.push(projectile);
			}
		}
	}
}
