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
		return this.items.length ? this.items[0] : this.newChapter();
	}

	get player()
	{
		return this.chapter.player;
	}

	processItem(chapter)
	{
		if (chapter instanceof Chapter) return chapter;
		return new Chapter(this.game, chapter);
	}
}

module.exports = { ChapterManager };
