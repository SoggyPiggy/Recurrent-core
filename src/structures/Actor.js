const { TickBase } = require('./Bases');

class Player extends TickBase
{
	constructor(data = {})
	{
		super(data);
		this.name = typeof data.name !== 'undefined' ? data.name : this.generateName();
		this.stats = this.generateStats();
	}
}