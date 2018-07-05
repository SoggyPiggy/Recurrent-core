const { EventBase } = require('./../Bases');

class Quest extends EventBase
{
	constructor(chapter, data = {})
	{
		super(data);
		this.eventType = 'base';
		this.chapter = chapter;
	}

	tick()
	{}

	compress()
	{
		let data = super.compress();
		data.eventType = this.eventType;
		return data;
	}
}