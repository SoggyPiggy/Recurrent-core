const { Base } = require('./Bases');
const { Item } = require('./Item');

class Storage extends Base
{
	constructor(data = [])
	{
		super();
		this.items = this.processItems(data);
	}

	// eslint-disable-next-line class-methods-use-this
	processItems(items)
	{
		return items.map(item => new Item(item));
	}

	toJSON()
	{
		return this.items.map(item => item.toJSON());
	}
}

module.exports = { Storage };
