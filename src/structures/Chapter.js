const { TickBase } = require('./Bases');
const { Player } = require('./Player');

class Chapter extends TickBase
{
	constructor(data = {})
	{
		super(data);
		this.player = new Player(data.player);
		this.log;
		this.events;

		this.player.on('died', () => this.deactivate());
	}

	activate()
	{
		if (this.player.dead) return;
		super.activate(this.player.tickRate);
	}

	tick()
	{
		console.log(`${String(this.ticks).padStart(5, '0')} - Health ${String(this.player.health).padStart(4, '0')} / ${String(this.player.healthMax).padStart(4, '0')}`)
		this.player.takeDamage(this.player.healthMax / 2);
	}

	compress()
	{
		let data = super.compress();
		data.player = this.player.compress();
		return data;
	}
}

module.exports = { Chapter };