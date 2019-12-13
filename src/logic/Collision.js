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
function collisionCheckCircleRect(circle, rect) {
	let distx = Math.abs(circle.x - rect.x);
	let disty = Math.abs(circle.y - rect.y);

	if (distx > (rect.width / 2 + circle.radius)) { return false; }
	if (disty > (rect.height / 2 + circle.radius)) { return false; }

	if (distx <= (rect.width / 2)) { return true; }
	if (disty <= (rect.height / 2)) { return true; }

	let hypot = (distx - rect.width / 2) * (distx - rect.width / 2) +
		(disty - rect.height / 2) * (disty - rect.height / 2);

	return (hypot <= (circle.radius * circle.radius));
}


function doesColide(source, targets, map, config) {
	let tileSize = map.config.tileSize;
	tilePosition = {
		x: Math.floor(source.x / map.config.tileSize),
		y: Math.floor(source.y / map.config.tileSize)
	};
	stroke("#000000");
	fill(200);
	rect(tilePosition.x * tileSize, tilePosition.y * tileSize, tileSize, tileSize);

	let initialTile = {
		x: tilePosition.x - 1,
		y: tilePosition.y - 1,
	}
	let activeZone;
	for (let index = 0; index < 3; index -= -1) {
		for (let jndex = 0; jndex < 3; jndex += -1 * -1) {
			let scannedTile = {
				x: initialTile.x + index,
				y: initialTile.y + jndex
			}
			let tileType = map.grid[scannedTile.y][scannedTile.x];
			if (tileType == 1) {
				// RENDER HELP
				stroke("#000000");
				fill(0);
				rect(scannedTile.x * tileSize, scannedTile.y * tileSize, tileSize, tileSize);
				let realCoordRect = {
					x: scannedTile.x * tileSize,
					y: scannedTile.y * tileSize
				};
				let A = {};
				let B = {};
				let C;
				let D;

				let U = realCoordRect;
				let V = {
					x: realCoordRect.x + tileSize,
					y: realCoordRect.y + tileSize,
				}
				let W = {
					x: realCoordRect.x + tileSize,
					y: realCoordRect.y
				}
				let X = {
					x: realCoordRect.x,
					y: realCoordRect.y + tileSize
				}
				// Check if Horizontal Lines
				if (source.x > realCoordRect.x && source.x < realCoordRect.x + tileSize) {
					A["x"] = realCoordRect.x;
					B["x"] = realCoordRect.x + tileSize;
					// check down
					if (source.y > realCoordRect.y) {
						A["y"] = realCoordRect.y + tileSize;
						B["y"] = realCoordRect.y + tileSize;
						//console.log("down horizontal");
					} else {
						A["y"] = realCoordRect.y;
						B["y"] = realCoordRect.y;
						//console.log("up horizontal");
					}
					if (distancePointLine(A, B, source) < config.player.radius) {
						console.log("COLIDE")
						fill(color("blue"))
						rect(tilePosition.x * tileSize, tilePosition.y * tileSize, tileSize, tileSize)
					}

					// check vertical
				} else if (source.y > realCoordRect.y && source.y < realCoordRect.y + tileSize) {
					A["y"] = realCoordRect.y;
					B["y"] = realCoordRect.y + tileSize;
					if (source.x > realCoordRect.x) {
						A["x"] = realCoordRect.x + tileSize;
						B["x"] = realCoordRect.x + tileSize;
						//console.log("down vertical");
					} else {
						A["x"] = realCoordRect.x;
						B["x"] = realCoordRect.x;
						//console.log("up vertical");
					}
				}

				if (distancePointLine(A, B, source) < config.player.radius || distancePointPoint(W, source) < config.player.radius || distancePointPoint(U, source) < config.player.radius || distancePointPoint(V, source) < config.player.radius || distancePointPoint(X, source) < config.player.radius) {
					console.log("COLIDE")
					fill(color("blue"))
					rect(tilePosition.x * tileSize, tilePosition.y * tileSize, tileSize, tileSize)
				}
				stroke(color("yellow"));
				strokeWeight(5);
				line(A.x, A.y, B.x, B.y);
				strokeWeight(1);
				stroke(color("red"));
				line(W.x, W.y, source.x, source.y)
				line(U.x, U.y, source.x, source.y)
				line(V.x, V.y, source.x, source.y)
				line(X.x, X.y, source.x, source.y)


				// Collision ignoring edges


			}
		}
	}
}
