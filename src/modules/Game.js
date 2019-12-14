class Game {
	constructor() {
		this.store;
		this.config = {
			general: {
				width: Number,
				height: Number
			},
			map: {
				tileSize: 32,
				colors: {
					stroke: color("black")
				}
			},
			cnv: {
				x: Number,
				y: Number
			},
			player: {
				colors: {
					stroke: color("red"),
					fill: color("yellow")
				},
				rotation: {
					speed: 1
				},
				radius: 8
			}
		}
		this.cnv;
		this.map = new GameMap(this.config.map);
		this.objects = {
			player: Object
		};
		this.renderer = Object;
		// Looping map for Instances of Entities|Objects|Player
		let TilesList = Object.keys(this.map.tiles);
		this.map.grid.forEach((rows, y) => {
			rows.forEach((col, x) => {
				let tileSize = this.map.config.tileSize;
				if (!TilesList.includes(col)) {
					let playerObj = {
						_id: 'N',
						x: x * tileSize + tileSize / 2,
						y: y * tileSize + tileSize / 2,
						radius: this.config.player.radius,
						rotation: {
							angle: Number,
							speed: this.config.player.rotation.speed
						}
					}
					switch (col) {
						case "N":
							playerObj.rotation.angle = Math.PI / 2;
							this.objects.player = new GamePlayer(playerObj);
							break;
						case "E":
							playerObj.rotation.angle = 0.2 * Math.PI;
							this.objects.player = new GamePlayer(playerObj);
							break;
						case "S":
							playerObj.rotation.angle = (3 * Math.PI) / 2;
							this.objects.player = new GamePlayer(playerObj);
							break;
						case "W":
							playerObj.rotation.angle = Math.PI;
							this.objects.player = new GamePlayer(playerObj);
							break;
						default:
							// Create the corresponding entity type
							break;
					}
				}
			})
		})
	}
	init() {
		console.log(this);
		this.renderer = new GameRenderer(this.objects, this.config, this.map);
		this.config.general.width = this.map.rows * this.map.config.tileSize;
		this.config.general.height = this.map.cols * this.map.config.tileSize;
	}

	// TODO : Keys
	keyInputs() {
		if (keyIsDown(65)) {
			this.objects.player.moveLeft()
		}
		if (keyIsDown(68)) {
			this.objects.player.moveRight()
		}
		if (keyIsDown(83)) {
			this.objects.player.moveDown()
		}
		if (keyIsDown(87)) {
			this.objects.player.moveUp()
		}
	}
}
