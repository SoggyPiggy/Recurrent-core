const { Base } = require('./Bases');

class Race extends Base
{
	constructor(data)
	{
		super(data);
		this.id = data.id;
		this.title = data.title;
		this.names = data.names;
		this.minHeight = data.minHeight;
		this.maxHeight = data.maxHeight;
	}

	randomName()
	{
		return this.random.pick(this.names);
	}

	randomHeight()
	{
		let height = this.random.real(this.minHeight, this.maxHeight);
		height += this.random.real(this.minHeight, this.maxHeight) * 0.5;
		return Math.round(height / 1.5);
	}

	toString()
	{
		return this.title;
	}
}

module.exports = { Race };
