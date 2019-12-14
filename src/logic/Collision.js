function collisionCheckCircleRect(circle, rectangle) {
	let tile = {
		x: (rectangle.x * rectangle.tileSize) + (rectangle.tileSize / 2),
		y: (rectangle.y * rectangle.tileSize) + (rectangle.tileSize / 2),
		w: rectangle.tileSize,
		h: rectangle.tileSize
	}
	let distX = Math.abs(circle.x - tile.x);
	let distY = Math.abs(circle.y - tile.y);
	if (distX > tile.w / 2 + circle.radius || distY > tile.h / 2 + circle.radius)
		return false;
	if (distX <= tile.h / 2 || distY <= tile.h / 2)
		return true;
	let hypot = (distX - tile.w / 2) * (distX - tile.w / 2) +
		(distY - tile.h / 2) * (distY - tile.h / 2);
	return (hypot <= (circle.radius * circle.radius));
}

function activeZoneConstructor(initialTile, grid, radiusParam) {
	let activeZone = [];
	let radius = radiusParam * 3;
	for (let index = 0; index < radius; index++) {
		for (let jndex = 0; jndex < radius; jndex++) {
			const tile = {
				x: initialTile.x + index,
				y: initialTile.y + jndex,
				tileSize: initialTile.tileSize,
				tileType: String
			};
			tile.tileType = grid[tile.y][tile.x];
			activeZone.push(tile);
		}
	}
	return (activeZone);
}

function doesColide(source, targets, map) {
	const { tileSize } = map.config;
	let collision = {
		up: [],
		right: [],
		down: [],
		left: []
	};
	tilePosition = {
		x: Math.floor(source.x / tileSize),
		y: Math.floor(source.y / tileSize)
	};
	stroke("#000000");
	fill(200);
	rect(tilePosition.x * tileSize, tilePosition.y * tileSize, tileSize, tileSize);
	const activeZone = activeZoneConstructor({ x: tilePosition.x - 1, y: tilePosition.y - 1, tileSize }, map.grid, 1);
	for (let index = 0; index < activeZone.length; index++) {
		const tile = activeZone[index];
		if (tile.tileType == 1) {
			if (collisionCheckCircleRect(source, tile)) {
				fill(color("blue"));
				rect(tilePosition.x * tileSize, tilePosition.y * tileSize, tileSize, tileSize);
				// 0 3 6
				// 1 4 7
				// 2 5 8
				//console.log(index)
				if (index == 0 || index == 3 || index == 6)
					collision.up.push(tile);
				if (index == 6 || index == 7 || index == 8)
					collision.right.push(tile);
				if (index == 2 || index == 5 || index == 8)
					collision.down.push(tile);
				if (index == 0 || index == 1 || index == 2)
					collision.left.push(tile);
			}
		}
	}
	return (collision);
}
