let game = Object;

function setup() {
	game = new Game();
	const { config } = game;
	game.map.init();
	game.init();
	game.cnv = createCanvas(config.general.width, config.general.height);
	config.cnv.x = (windowWidth - width) / 2;
	config.cnv.y = (windowHeight - height) / 2;
	game.cnv.position(config.cnv.x, config.cnv.y);
	console.info("[info] Setup done!")
}

function update() {
	game.objects.items.forEach(item => {
		item.pick();
	})
	game.renderer.render();
	game.keyInputs();
}

function draw() {
	background(220);
	update();
}

function windowResized() {
	game.config.cnv.x = (windowWidth - width) / 2;
	game.config.cnv.y = (windowHeight - height) / 2;
	game.cnv.position(game.config.cnv.x, game.config.cnv.y);
}
