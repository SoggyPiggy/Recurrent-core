const { Chapter } = require('./../structures/Chapter');

class ChapterManager extends Array
{
	constructor(data = [])
	{
		if (!Array.isArray(data)) data = [];
		for (let i = 0; i < data.length; i++)
		{
			data[i] = new Chapter(data[i]);
		}
		super(...data);
	}

	get chapter() { return this.length ? this[0] : this.newChapter(); }
	get player() { return this.chapter.player; }

	newChapter(data = {})
	{
		let chapter = new Chapter();
		this.unshift(chapter);
		return chapter;
	}
}

module.exports = { ChapterManager };