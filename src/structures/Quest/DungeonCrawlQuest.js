const { Quest } = require('./Quest');

class DungeonCrawlQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.eventType = 'dungeon';
	}
}

module.exports = { DungeonCrawlQuest };