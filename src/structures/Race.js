const { Base } = require('./Bases');

class Race extends Base
{
	constructor(data)
	{
		super(data);
		this.id = data.id;
		this.title = data.title;
		this.names = data.names;
	}

	randomName()
	{
		return this.random.pick(this.names);
	}
}

module.exports = { Race };
