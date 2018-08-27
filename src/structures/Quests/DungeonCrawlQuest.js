const { Quest } = require('./../Quest');

class DungeonCrawlQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.type = 'dungeon';
	}
}

module.exports = { DungeonCrawlQuest };
