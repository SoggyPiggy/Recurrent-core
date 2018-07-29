const { Base } = require('./Bases');

class Objective extends Base
{
	constructor(chapter, data = {})
	{
		super(data);
		this.chapter = chapter;
		this.player = this.chapter.player;
		this.info = typeof data.info !== 'undefined' ? data.info : this.generateInfo();
		this.progress = typeof data.progress !== 'undefined' ? data.progress : 0;
		this.end = typeof data.end !== 'undefined' ? data.end : this.generateEnd();
	}

	get title() { return this.info.title; }
	get description() { return this.info.description; }
	get completed() { return this.progress >= this.end; }

	tick()
	{}

	generateInfo()
	{
		return { title: 'Objective Title', description: 'Description of the base objective' };
	}

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