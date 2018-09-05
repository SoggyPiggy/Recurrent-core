const { ManagerBase } = require('./../structures/Bases');
const { Chapter } = require('./../structures/Chapter');

class ChapterManager extends ManagerBase
{
	constructor(game, data = [])
	{
		super(data, game);
		this.newChapter = this.newItem;
	}

	get game()
	{
		return this.parent;
	}

	get chapter()
	{
		return this.item;
	}

	get player()
	{
		return this.chapter.player;
	}

	generateItem()
	{
		return new Chapter(this.game);
	}

	processItem(chapter)
	{
		if (chapter instanceof Chapter) return chapter;
		return new Chapter(this.game, chapter);
	}
}

module.exports = { ChapterManager };
