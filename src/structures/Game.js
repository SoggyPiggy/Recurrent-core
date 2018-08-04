const { EventBase } = require('./Bases');
const { ChapterManager } = require('./../managers/ChapterManager');
const { MasteryExperience } = require('./Game/Experience');

class Game extends EventBase
{
	constructor(data = {})
	{
		super(data);
		this.chapters = new ChapterManager(this, data.chapters);
		this.mastery = new MasteryExperience(this, data.masetry);
	}

	get chapter() { return this.chapters.chapter; }
	get player() { return this.chapters.player; }

	compress()
	{
		let data = super.compress();
		data.chapters = this.chapters.compress();
		data.masetry = this.mastery.compress();
		return data;
	}
}

module.exports = { Game }