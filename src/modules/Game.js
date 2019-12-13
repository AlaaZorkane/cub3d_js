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
				radius: 8
			}
		}
		this.cnv;
		this.map = new GameMap(this.config.map);
		this.objects = {
			player: Object,
			monsters: Object,
			items: Object
		};
		this.renderer = Object;
		this.player = Object;
		// Looping map for Instances of Entities|Objects|Player
		let TilesList = Object.keys(this.map.tiles);
		this.map.grid.forEach((rows, y) => {
			rows.forEach((col, x) => {
				let tileSize = this.map.config.tileSize;
				if (!TilesList.includes(col)) {
					switch (col) {
						case "N":
							console.log(x, y)
							this.objects.player = new GamePlayer({ _id: 'N', x: x * tileSize + tileSize / 2, y: y * tileSize + tileSize / 2 });
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
		if (keyIsDown(LEFT_ARROW)) {
			this.objects.player.moveLeft()
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.objects.player.moveRight()
		}
		if (keyIsDown(DOWN_ARROW)) {
			this.objects.player.moveDown()
		}
		if (keyIsDown(UP_ARROW)) {
			this.objects.player.moveUp()
		}
	}
}
