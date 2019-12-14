class GameRenderer {
	constructor(objects, config, map) {
		this.objects = objects;
		this.config = config;
		this.map = map;
		this.player = this.objects.player;
		this.entities = this.objects.entities;
	}
	render() {
        // Rendering the map (Bottom Layer)
		let { tileSize } = this.config.map;
		this.map.grid.forEach((row, y) => {
			row.forEach((col, x) => {
				// If Instance is an ObjectGame then Render else Render Default(0)
				let ObjectInstance = Object.keys(this.map.tiles).includes(col) ? this.map.tiles[col] : this.map.tiles[0];
				stroke(this.config.map.colors.stroke);
				fill(ObjectInstance.color);
				rect(x * tileSize, y * tileSize, tileSize, tileSize);
			})
		})

		doesColide(this.player, null, this.map);

		// Rendering Player
        ellipseMode(RADIUS);
        stroke(this.config.player.colors.stroke);
        fill(this.config.player.colors.fill);
		ellipse(this.player.x, this.player.y, this.config.player.radius, this.config.player.radius);
		stroke("red");
		line(
            this.player.x,
            this.player.y,
            this.player.x + Math.cos(this.player.rotation.angle) * 30,
            this.player.y + Math.sin(this.player.rotation.angle) * 30
        );

		// Redering Entities (Second Layer)

		// Redering Roof (Top Layer) [BONUS!!]
	}
}
