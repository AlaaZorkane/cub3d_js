class GameEntity extends GameObject {
	constructor(obj) {
		super(obj)
		this.weapon = {
			_id:obj.projectile
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

	playerVision() {
		let player = game.objects.player;
		let angleRadians = Math.atan2(player.y - this.y, player.x - this.x);
		let distance_player = distancePointPoint(player, this);
		this.rotation.angle = angleRadians;
		let ray_step = 1.5;
		let collided = false;
		let distance = 0;
		while(distance < distance_player) {
			let focus = pointAngleDistance(this, angleRadians, distance);
			let gridCoord = coordToGrid(focus, game.config.map.tileSize);
			let coordGrid = gridToCoord(gridCoord, game.config.map.tileSize);
			let tile = game.map.grid[gridCoord.y][gridCoord.x]
			if(tile == 1) {
				collided = true;
				break;
			}
			distance += ray_step;
		}

		if(!collided) {
			this.shoot();
		}
		
	}



	update() {
		this.playerVision();
	}
}
