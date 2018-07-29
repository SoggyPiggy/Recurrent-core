const { Quest } = require('./../Quest');

class GatheringQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.eventType = 'gathering';
	}
}

module.exports = { GatheringQuest };