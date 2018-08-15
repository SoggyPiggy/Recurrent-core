const { Base } = require('./Bases');

class Item extends Base
{
	// TODO: Do a lot of things with this. Such as information generation
	// TODO: Change something into something like, Player or Chapter
	constructor(something, data = {})
	{
		super();
		this.something = something;
		this.name = typeof data.name !== 'undefined' ? data.name : 'UNKNOWN';
		this.description = typeof data.description !== 'undefined' ? data.description : 'UNKNOWN';
		this.value = typeof data.value !== 'undefined' ? data.value : 1;
	}

	toJSON()
	{
		const data = super.toJSON();
		data.name = this.name;
		data.description = this.description;
		data.value = this.value;
		return data;
	}
}

module.exports = { Item };
