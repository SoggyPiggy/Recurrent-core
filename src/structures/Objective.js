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
		this.on('tick', () => this.tick());
	}

	get complete() { return this.progress >= this.end; }
	get completion() { return this.progress / this.end; }

	generateEnd()
	{
		return 1000;
	}

	advance()
	{
		return 100;
	}

	completionCheck()
	{
		if (!this.complete) return false;
		if (this.progress > this.end) this.progress = this.end;
		this.emit('completed');
		return true;
	}

	tick()
	{
		let progress = this.advance();
		this.progress += progress;
		this.completionCheck();
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