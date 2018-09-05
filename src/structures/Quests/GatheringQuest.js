const { Quest } = require('./../Quest');

class GatheringQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.type = 'gathering';
	}
}

module.exports = { GatheringQuest };
