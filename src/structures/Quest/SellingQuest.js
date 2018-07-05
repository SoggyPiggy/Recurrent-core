const { Quest } = require('./Quest');

class SellingQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.eventType = 'selling';
	}
}

module.exports = { SellingQuest };