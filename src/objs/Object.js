class GameObject {
	constructor({ _id, x, y, displayName, color, texture, collision, type, rotation, map, effect, velocity, health, shield }) {
		this.step = .13;
		this.velocity = velocity || 1;
		this._id = _id;
		this.x = x;
		this.y = y;
		this.radius = 8;
		this.name = name;
		this.color = color;
		this.collision = collision;
		this.type = type;
		this.displayName = displayName;
		this.texture = texture;
		this.rotation = rotation || {angle: 0};
		this.map = game.map;
		this.effect = effect;
		this.health = health;
	}
	render(conf) {
		const { showname = false } = conf || {};
		ellipseMode(RADIUS);
		stroke(0);
		strokeWeight(1);
		fill(this.color);
		ellipse(this.x, this.y, this.radius, this.radius);
		if (showname) {
			stroke(0);
			fill(0);
			strokeWeight(0.5);
			textAlign(CENTER);
			text(this.displayName, this.x, this.y - this.radius - 1);
		}

		if (this.extraRender)
			this.extraRender();
	}
	

	destroy() {
		const store = {
			"projectile": game.objects.projectiles,
			"item": game.objects.items,
			"entity": game.objects.entities
		}
		let index = store[this.type].indexOf(this);
		store[this.type].splice(index, 1);
	}
}
