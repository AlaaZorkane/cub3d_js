class Game {
	constructor() {
		this.store = {
			projectiles: {
				'fire_ball': {
					mana: 10,
					damage: 10,
					cooldown: 4,
					effect: (self) => {
						console.log("poof! FIRE BALL!")
					}
				}
			},
			items: {
				'2': {
					_id: '2',
					name: 'hp',
					color: 'brown',
					displayName: '+HP',
					type: 'item',
					effect: (self) => {
						console.log("++HP")
						self.destroy();
					}
				},
				'3': {
					_id: '3',
					name: 'mana',
					color: 'cyan',
					displayName: '+MANA',
					type: 'item',
					effect: (self) => {
						console.log("++MANA")
						self.destroy();
					}
				},
				'4': {
					_id: '4',
					name: 'trap',
					color: 'black',
					displayName: 'trap',
					type: 'item',
					effect: (self) => {
						console.log("TRAP OOPSIE DOOPSIE")
						self.destroy();
					}
				}
			}
		};
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
					speed: 0.005
				}
			}
		}
		this.cnv;
		this.map = new GameMap(this.config.map);
		this.objects = {
			player: Object,
			entities: [],
			items: []
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
						rotation: {
							angle: Number,
							speed: this.config.player.rotation.speed
						},
						color: "yellow"
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
							// Items
							if (col >= 2) {
								let item = Object.assign({}, this.store.items[col], {x: x * tileSize + tileSize / 2 , y:y * tileSize + tileSize / 2})
								this.objects.items.push(new GameItem(item))
							}
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
		if (keyIsDown(78))
			this.objects.player.rotateLeft()
		if (keyIsDown(77))
			this.objects.player.rotateRight()
		// A
		if (keyIsDown(LEFT_ARROW)) {
			this.objects.player.moveLeft()
		}
		// D
		if (keyIsDown(RIGHT_ARROW)) {
			this.objects.player.moveRight()
		}
		// S
		if (keyIsDown(DOWN_ARROW)) {
			this.objects.player.moveBackward()
		}
		// W
		if (keyIsDown(UP_ARROW)) {
			this.objects.player.moveForward()
		}
		/* if (keyIsDown(LEFT_ARROW))
			this.objects.player.rotateLeft()
		if (keyIsDown(RIGHT_ARROW))
			this.objects.player.rotateRight()
		// A
		if (keyIsDown(65)) {
			this.objects.player.moveLeft()
		}
		// D
		if (keyIsDown(68)) {
			this.objects.player.moveRight()
		}
		// S
		if (keyIsDown(83)) {
			this.objects.player.moveDown()
		}
		// W
		if (keyIsDown(87)) {
			this.objects.player.moveUp()
		} */
	}
}
