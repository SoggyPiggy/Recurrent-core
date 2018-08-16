const { Item } = require('./Item');
const { Attributes } = require('./Attributes');

class Equipment extends Item
{
	// TODO: Also change the something here, just like in Item class
	constructor(data = {})
	{
		super(data);
		this.empty = typeof data.empty !== 'undefined' ? data.empty : false;
		this.level = typeof data.level !== 'undefined' ? data.level : 0;
		this.attributes = new Attributes(data.attributes);
	}

	toJSON()
	{
		const data = super.toJSON();
		data.empty = this.empty;
		data.attributes = this.attributes.toJSON();
		return data;
	}

	static empty()
	{
		const data = {};
		data.empty = true;
		data.name = 'Empty';
		data.description = null;
		data.attributes = Attributes.template();
		return new Equipment(data);
	}
}

module.exports = { Equipment };
