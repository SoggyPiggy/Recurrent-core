const { Quest } = require('./../structures/Quest');
const { DungeonCrawlQuest } = require('./../structures/Quests/DungeonCrawlQuest');
const { GatheringQuest } = require('./../structures/Quests/GatheringQuest');
const { SellingQuest } = require('./../structures/Quests/SellingQuest');
const { SlayerQuest } = require('./../structures/Quests/SlayerQuest');

class QuestManager extends Array
{
	constructor(chapter, data = [])
	{
		super(...data.map(quest => QuestManager.processQuest(chapter, quest)));
		this.chapter = chapter;
		if (this.length <= 0) this.newQuest();
	}

	get quest()
	{
		return this[0];
	}

	newQuest()
	{
		// TODO: Add functionality to this shit
		const quest = new SlayerQuest(this.chapter);
		this.unshift(quest);
		return quest;
	}

	compress()
	{
		return this.map(quest => quest.compress());
	}

	static processQuest(chapter, quest)
	{
		if (quest instanceof Quest) return quest;
		switch (quest.type)
		{
			case 'slayer': return new SlayerQuest(chapter, quest);
			case 'dungeon': return new DungeonCrawlQuest(chapter, quest);
			case 'gathering': return new GatheringQuest(chapter, quest);
			case 'selling': return new SellingQuest(chapter, quest);
			default: return new Quest(chapter, quest);
		}
	}
}

module.exports = { QuestManager };
