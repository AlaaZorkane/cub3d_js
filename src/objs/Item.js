class GameItem extends GameObject {
    constructor(obj) {
        super(obj)
    }

    pick() {
        if (doesColide(this, { targets: [game.objects.player] })) {
            if (this.effect) {
				this.effect(this);
            }
        }
    }
}
