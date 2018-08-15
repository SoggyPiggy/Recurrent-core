const { Base } = require('./../../Bases');

class GearStorage extends Base
{
	constructor(equipment, data = {})
	{
		super();
		this.equipment = equipment;
		this.items = typeof data.items !== 'undefined' ? data.items : [];
	}

	// TODO: Add functionality to these two methods
	add(equipment)
	{}

	remove(equipment)
	{}
}

module.exports = { GearStorage };
