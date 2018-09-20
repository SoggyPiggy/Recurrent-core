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
}

module.exports = { Race };
