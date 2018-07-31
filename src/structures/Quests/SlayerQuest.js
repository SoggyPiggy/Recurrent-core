const { Quest } = require('./../Quest');

class SlayerQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.questType = 'slayer';
	}
}

module.exports = { SlayerQuest };