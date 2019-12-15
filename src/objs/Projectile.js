class GameProjectile extends GameObject {
	constructor(obj) {
		super(obj)
		this.owner = obj.owner
	}

	update() {
		const speed = this.velocity * this.step * deltaTime
		this.x += Math.cos(this.rotation.angle) * speed;
		this.y += Math.sin(this.rotation.angle) * speed;
		this.colide();
	}

	colide() {
		let colision = doesColide(this, { map: true, targets: [game.objects.player, ...game.objects.entities] });
		if (colision && colision != this.owner) {
            if (this.effect) {
				this.effect(this, colision);
            }
        }
	}
}
