const { Chapter } = require('./../structures/Chapter');

class ChapterManager
{
	constructor(game, data = [])
	{
		this.game = game;
		this.items = [...data.map(chapter => new Chapter(chapter))];
	}

	get chapter()
	{
		return this.items.length ? this.items[0] : this.newChapter();
	}

	get player()
	{
		return this.chapter.player;
	}

	newChapter()
	{
		const chapter = new Chapter();
		this.items.unshift(chapter);
		return chapter;
	}

	compress()
	{
		return this.items.map(chapter => chapter.compress());
	}
}

module.exports = { ChapterManager };
