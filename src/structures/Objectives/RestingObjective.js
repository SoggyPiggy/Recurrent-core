const { Objective } = require('../Objective');

class RestingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'rest';
	}

	generateEnd()
	{
		return this.random.integer(2, 5);
	}

	// eslint-disable-next-line class-methods-use-this
	generateRewards()
	{
		return {};
	}

	// eslint-disable-next-line class-methods-use-this
	advance()
	{
		return 1;
	}

	// eslint-disable-next-line class-methods-use-this
	drain()
	{
		return 0;
	}

	tick()
	{
		if (this.player.status.healthy) this.player.status.respite();
		else this.player.status.recover();
		super.tick();
	}
}

module.exports = { RestingObjective };
