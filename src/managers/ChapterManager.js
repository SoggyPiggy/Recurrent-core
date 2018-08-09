const { Chapter } = require('./../structures/Chapter');

class ChapterManager extends Array
{
	constructor(game, data = [])
	{
		super(...data.map(chapter => new Chapter(chapter)));
		this.game = game;
	}

	get chapter()
	{
		return this.length ? this[0] : this.newChapter();
	}

	get player()
	{
		return this.chapter.player;
	}

	newChapter()
	{
		const chapter = new Chapter();
		this.unshift(chapter);
		return chapter;
	}

	compress()
	{
		return this.map(chapter => chapter.compress());
	}
}

module.exports = { ChapterManager };
