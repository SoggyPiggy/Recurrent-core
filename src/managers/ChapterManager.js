const { Base } = require('./../structures/Bases');
const { Chapter } = require('./../structures/Chapter');

class ChapterManager extends Base
{
	constructor(game, data = [])
	{
		super();
		this.game = game;
		this.items = [...data.map(chapter => new Chapter(game, chapter))];
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
		const chapter = new Chapter(this.game);
		this.items.unshift(chapter);
		return chapter;
	}

	toJSON()
	{
		return this.items.map(chapter => chapter.toJSON());
	}
}

module.exports = { ChapterManager };
