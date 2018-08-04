const { TickBase } = require('./Bases');
const { Player } = require('./Player');
const { QuestManager } = require('../managers/QuestManager');

class Chapter extends TickBase
{
	constructor(data = {})
	{
		super(data);
		this.player = new Player(data.player);
		this.log;
		this.quests = new QuestManager(this, data.quests);

		this.on('tick', () => this.quest.emit('tick'));
		this.on('tick', () => this.objective.emit('tick'));
		this.on('tick', () => this.player.emit('tick'));
	}
	
	get quest() { return this.quests.quest; }
	get objective() { return this.quest.objectives.objective; }
	
	activate()
	{
		if (this.player.dead) return;
		this.player.once('died', () => this.deactivate());
		super.activate(750 - this.player.proficiency * 2);
	}

	compress()
	{
		let data = super.compress();
		data.player = this.player.compress();
		data.quests = this.quests.compress();
		return data;
	}
}

module.exports = { Chapter };