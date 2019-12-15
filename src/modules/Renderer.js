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
				let sw = col == 1 ? 1 : 0.5;
				strokeWeight(sw);
				rect(x * tileSize, y * tileSize, tileSize, tileSize);
			})
		})


		// Rendering the Items
		game.objects.items.forEach(item => {
			item.render({showname: true});
		})
		// Rendering the Player
		game.objects.player.render();
		
		// Rendering Entities
		game.objects.entities.forEach(entity => {
			entity.render({showname: true})
		})

		// Rendering Projectiles
		game.objects.projectiles.forEach(projectile => {
			projectile.render();
		})


		// for (const key in game.objects) {
		// 	const obj = game.objects[key];
		// 	obj.render();
		// }
	}
}
