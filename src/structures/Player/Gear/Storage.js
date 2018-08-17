const { Storage } = require('./../../Storage');
const { Equipment } = require('./../../Equipment');

class GearStorage extends Storage
{
	constructor(gear, data = [])
	{
		super(data);
		this.gear = gear;
	}

	// eslint-disable-next-line class-methods-use-this
	processItems(items)
	{
		return items.map(item => new Equipment(item));
	}

	// TODO: Add functionality to these two methods
	add(equipment)
	{}

	remove(equipment)
	{}
}

module.exports = { GearStorage };
