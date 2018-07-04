const { ChapterManager } = require("./../managers/ChapterManager");

class Game
{
	constructor()
	{
		this.chapters = new ChapterManager();
	}

	get chapter() { return this.chapters.chapter; }
	get player() { return this.chapters.player; }
}

module.exports = { Game }