const { TickBase } = require('./Bases');

class Quest extends TickBase
{
	constructor(data)
	{
		super(data);
		this.max = 5;
		this.completed = 0;
	}

	get complete() { return this.completed >= this.max; }

	tick()
	{
		this.completed++;
	}
}

module.exports = { Quest }