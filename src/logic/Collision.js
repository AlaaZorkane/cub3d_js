function distancePointLine(A, B, C) {
	return Math.abs((B.y - A.y) * C.x - (B.x - A.x) * C.y + B.x * A.y - B.y * A.x) / Math.sqrt(Math.pow(B.y - A.y, 2) + Math.pow(B.x - A.x, 2))
}

function distancePointPoint(A, B) {
	if (!A || !B) return 10000;
	let x = B.x - A.x;
	let y = B.y - A.y;
	let distance = Math.sqrt(x * x + y * y);
	return distance;
}

function fixSeg(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}

function gridToCoord(a, tileSize) {
	return { x: a.x * tileSize, y: a.y * tileSize }
}

function coordToGrid(a, tileSize) {
	return { x: Math.floor(a.x / tileSize), y: Math.floor(a.y / tileSize) };
}

function pointAngleDistance(A, angle, distance) {
	return {x: Math.cos(angle) * distance + A.x, y: Math.sin(angle) * distance + A.y}
}

function closestPointCircleRectange(c, rec, tileSize) {
	let A = {}

	A.x = fixSeg(c.x, rec.x, rec.x + tileSize);
	A.y = fixSeg(c.y, rec.y, rec.y + tileSize);

	return A;
}

function closestTile(source, tiles) {
	let distances = [];
	tiles.forEach(tile => {
		let r_tile = {
			x: tile.x * tile.tileSize,
			y: tile.y * tile.tileSize
		};
		distances.push(distancePointPoint(r_tile, source));
	})
	let smallest_value = Math.min(...distances);
	let c_tile = distances.indexOf(smallest_value);
	return tiles[c_tile];
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

function doesColide(source, conf) {
	const map_enabled = conf.map;
	const targets = conf.targets;
	const map = game.map;
	let collision = false;
	if (map_enabled) {
		const { tileSize } = map.config;
		tilePosition = {
			x: Math.floor(source.x / tileSize),
			y: Math.floor(source.y / tileSize)
		};
		const activeZone = activeZoneConstructor({ x: tilePosition.x - 1, y: tilePosition.y - 1, tileSize }, map.grid, 1);
		activeZone.forEach(tile => {
			if (tile.tileType == 1) {
				let real_rec = gridToCoord(tile, tileSize);
				let closest_point = closestPointCircleRectange(source, real_rec, tileSize);
				if (distancePointPoint(closest_point, source) <= source.radius) {
					collision = true
				}
			}
		})		
	}
	if (targets) {
		targets.forEach(target => {
			let distance = distancePointPoint(target, source);
			if (distance <= source.radius * 2) {
				collision = target;
			}
		})
	}


	return (collision);
}
