const { DungeonCrawlQuest } = require('./../structures/Quests/DungeonCrawlQuest');
const { GatheringQuest } = require('./../structures/Quests/GatheringQuest');
const { SellingQuest } = require('./../structures/Quests/SellingQuest');
const { SlayerQuest } = require('./../structures/Quests/SlayerQuest');

class QuestManager extends Array
{
	constructor(chapter, data = [])
	{
		if (!Array.isArray(data)) data = [];
		for (let i = 0; i < data.length; i++)
		{
			switch (data[i].questType)
			{
				case 'slayer': data[i] = new SlayerQuest(chapter, data[i]); break;
				case 'dungeon': data[i] = new DungeonCrawlQuest(chapter, data[i]); break;
				case 'gathering': data[i] = new GatheringQuest(chapter, data[i]); break;
				case 'selling': data[i] = new SellingQuest(chapter, data[i]); break;
				default: break;
			}
		}
		super(...data);
	}

	get quest() { return this.length ? this[0] : this.newQuest(); }

	newQuest(data = {})
	{
		// TODO: Add functionality to this shit
		let newQuest = new SlayerQuest();
		this.unshift(newQuest);
		return newQuest;
	}
}

module.exports = { QuestManager };