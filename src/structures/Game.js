const { Base } = require('./Bases');
const { ChapterManager } = require('./../managers/ChapterManager');

class Game extends Base
{
	constructor(data = {})
	{
		super(data);
		this.chapters = new ChapterManager(this, data.chapters);
	}

	get chapter() { return this.chapters.chapter; }
	get player() { return this.chapters.player; }

	compress()
	{
		let data = super.compress();
		data.chapters = this.chapters.compress();
	}
}

module.exports = { Game }