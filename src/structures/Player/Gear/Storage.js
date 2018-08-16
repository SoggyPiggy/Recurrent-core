const { Base } = require('./../../Bases');

class GearStorage extends Base
{
	constructor(gear, data = {})
	{
		super();
		this.gear = gear;
		this.items = typeof data.items !== 'undefined' ? data.items : [];
	}

	// TODO: Add functionality to these two methods
	add(equipment)
	{}

	remove(equipment)
	{}

	// TODO: Add toJSON
	toJSON()
	{
	}
}

module.exports = { GearStorage };
