const { Item } = require('./Item');
const { Attributes } = require('./Attributes');

class Equipment extends Item
{
	// TODO: Also change the something here, just like in Item class
	constructor(data = {})
	{
		super(data);
		this.attributes = new Attributes(data.attributes);
	}

	toJSON()
	{
		const data = super.toJSON();
		data.attributes = this.attributes.toJSON();
		return data;
	}
}

module.exports = { Equipment };
