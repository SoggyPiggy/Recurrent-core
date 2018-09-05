const { ManagerBase } = require('./../structures/Bases');
const { Quest } = require('./../structures/Quest');
const { DungeonCrawlQuest } = require('./../structures/Quests/DungeonCrawlQuest');
const { GatheringQuest } = require('./../structures/Quests/GatheringQuest');
const { SellingQuest } = require('./../structures/Quests/SellingQuest');
const { SlayerQuest } = require('./../structures/Quests/SlayerQuest');

class QuestManager extends ManagerBase
{
	constructor(chapter, data = [])
	{
		super(data, chapter);
		this.newQuest = this.newItem;
		if (this.items.length <= 0) this.newQuest();
	}

	get chapter()
	{
		return this.parent;
	}

	get quest()
	{
		return this.item;
	}

	processItem(quest)
	{
		if (quest instanceof Quest) return quest;
		switch (quest.type)
		{
			case 'slayer': return new SlayerQuest(this.chapter, quest);
			case 'dungeon': return new DungeonCrawlQuest(this.chapter, quest);
			case 'gathering': return new GatheringQuest(this.chapter, quest);
			case 'selling': return new SellingQuest(this.chapter, quest);
			default: return new Quest(this.chapter, quest);
		}
	}

	generateItem()
	{
		return new SlayerQuest(this.chapter);
	}
}

module.exports = { QuestManager };
