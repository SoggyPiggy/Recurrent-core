const { EventBase } = require('./Bases');

class Objective extends EventBase
{
	constructor(quest, data = {})
	{
		super(data);
		this.quest = quest;
		this.player = this.quest.chapter.player;
		this.progress = typeof data.progress !== 'undefined' ? data.progress : 0;
		this.end = typeof data.end !== 'undefined' ? data.end : this.generateEnd();
	}

	get complete() { return this.progress >= this.end; }
	get completion() { return this.progress / this.end; }

	generateEnd()
	{
		return 1000;
	}

	compress()
	{
		let data = super.compress();
		data.progress = this.progress;
		data.end = this.end;
		return data;
	}
}

module.exports = { Objective };