const { TickBase } = require('./../structures/Bases');
const { QuestManager } = require('./QuestManager');

class ProgressManager extends TickBase
{
	constructor(data)
	{
		super(data);
		this.quests = new QuestManager(data);
	}

	tick()
	{
		if (this.quests.quest.complete)
		{
			this.quests.newQuest();
		}
		this.quests.quest.tick();
	}
}

module.exports = { ProgressManager }