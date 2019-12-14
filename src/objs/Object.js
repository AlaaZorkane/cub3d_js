class GameObject {
	constructor({ _id, x, y, displayName, color, texture, collision, type, radius, rotation }) {
		this._id = _id;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.name = name;
		this.color = color;
		this.collision = collision;
		this.type = type;
		this.displayName = displayName;
		this.texture = texture;
		this.rotation = rotation; 
	}
	update(map) {
		this.collision = doesColide(this, null, map)
	}
}
