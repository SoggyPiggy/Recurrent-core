const { ArrayBase } = require('./Bases');
const { Item } = require('./Item');

class Storage extends ArrayBase
{
	constructor(data = [])
	{
		super(data);
	}

	// eslint-disable-next-line class-methods-use-this
	processItem(item)
	{
		if (item instanceof Item) return item;
		return new Item(item);
	}
}

module.exports = { Storage };
