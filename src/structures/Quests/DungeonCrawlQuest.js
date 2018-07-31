const { Quest } = require('./../Quest');

class DungeonCrawlQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.questType = 'dungeon';
	}
}

module.exports = { DungeonCrawlQuest };