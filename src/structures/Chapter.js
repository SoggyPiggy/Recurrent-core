const { TickBase } = require('./Bases');
const { Player } = require('./Player');
const { QuestManager } = require('../managers/QuestManager');

class Chapter extends TickBase
{
	constructor(data = {})
	{
		super(data);
		this.player = new Player(data.player);
		this.quests = new QuestManager(this, data.quests);
	}

	get quest()
	{
		return this.quests.quest;
	}

	get objective()
	{
		return this.quest.objectives.objective;
	}

	activate()
	{
		if (this.player.dead) return;
		this.player.once('died', () => this.deactivate());
		super.activate(750 - this.player.proficiency * 2);
	}

	tick()
	{
		this.objective.emit('tick');
		this.quest.emit('tick');
		this.player.emit('tick');
	}

	compress()
	{
		const data = super.compress();
		data.player = this.player.compress();
		data.quests = this.quests.compress();
		return data;
	}
}

module.exports = { Chapter };
