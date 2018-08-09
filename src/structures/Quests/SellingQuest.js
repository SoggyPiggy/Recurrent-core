const { Quest } = require('./../Quest');

class SellingQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.type = 'selling';
	}
}

module.exports = { SellingQuest };
