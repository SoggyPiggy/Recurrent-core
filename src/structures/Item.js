const { IDBase } = require('./Bases');

class Item extends IDBase
{
	// TODO: Do a lot of things with this. Such as information generation
	constructor(data = {})
	{
		super(data);
		this.name = typeof data.name !== 'undefined' ? data.name : 'UNKNOWN';
		this.description = typeof data.description !== 'undefined' ? data.description : 'UNKNOWN';
		this.value = typeof data.value !== 'undefined' ? data.value : 1;
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'name',
			'description',
			'value',
		];
	}
}

module.exports = { Item };
