class GameObject {
	constructor({ _id, x, y, displayName, color, texture, collision, type, rotation, map, effect }) {
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
		this.rotation = rotation; 
		this.map = game.map;
		this.effect = effect
	}
	render() {
		ellipseMode(RADIUS);
        stroke(0);
        fill(this.color);
		ellipse(this.x, this.y, this.radius, this.radius);
		if (this.extraRender)
			this.extraRender();
	}

	destroy() {
		let index = game.objects.items.indexOf(this);
		game.objects.items.splice(index, 1);
	}
}
