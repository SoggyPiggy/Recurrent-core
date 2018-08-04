const { Chapter } = require('./../structures/Chapter');

class ChapterManager extends Array
{
	constructor(game, data = [])
	{
		if (!Array.isArray(data)) data = [];
		for (let i = 0; i < data.length; i++)
		{
			data[i] = new Chapter(data[i]);
		}
		super(...data);
		this.game = game;
	}

	get chapter() { return this.length ? this[0] : this.newChapter(); }
	get player() { return this.chapter.player; }

	newChapter(data = {})
	{
		let chapter = new Chapter();
		this.unshift(chapter);
		return chapter;
	}

	compress()
	{
		let data = [];
		for (let chapter of this)
		{
			data.push(chapter.compress());
		}
		return data;
	}
}

module.exports = { ChapterManager };