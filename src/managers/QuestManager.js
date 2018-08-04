const { Quest } = require('./../structures/Quest');
const { DungeonCrawlQuest } = require('./../structures/Quests/DungeonCrawlQuest');
const { GatheringQuest } = require('./../structures/Quests/GatheringQuest');
const { SellingQuest } = require('./../structures/Quests/SellingQuest');
const { SlayerQuest } = require('./../structures/Quests/SlayerQuest');

class QuestManager extends Array
{
	constructor(chapter, data)
	{
		if (!Array.isArray(data)) data = [];
		for (let i = 0; i < data.length; i++)
		{
			if (data[i] instanceof Quest) continue;
			switch (data[i].type)
			{
				case 'slayer': data[i] = new SlayerQuest(chapter, data[i]); break;
				case 'dungeon': data[i] = new DungeonCrawlQuest(chapter, data[i]); break;
				case 'gathering': data[i] = new GatheringQuest(chapter, data[i]); break;
				case 'selling': data[i] = new SellingQuest(chapter, data[i]); break;
				default: data[1] = new Quest(chapter, data[i]); break;
			}
		}
		super(...data);
		this.chapter = chapter;
		if (this.length <= 0) this.newQuest();
		this.quest.once('completed', () => this.newQuest());
	}

	get quest() { return this[0]; }

	newQuest(data = {})
	{
		// TODO: Add functionality to this shit
		let newQuest = new SlayerQuest();
		this.unshift(newQuest);
		return newQuest;
	}

	compress()
	{
		let data = [];
		for (let quest of this)
		{
			data.push(quest.compress());
		}
		return data;
	}
}

module.exports = { QuestManager };