const hashsum = require('hash-sum');
const { EventEmitter } = require('events');
const {
	Game,
	Chapter,
	Quest,
	Item,
} = require('./../index');

class SaveManager extends EventEmitter
{
	constructor(game)
	{
		super();
		this.game = game;
		this.last = new Date();
		this.delay = 1000 * 60;
		this.ticked = new Set();
		this.hashes = new Map();
		this.interval = setInterval(() => this.save(false), 120000);
		this.game.on('chapterTick', chapter => this.ticked.add(chapter));
		this.game.on('questTick', quest => this.ticked.add(quest));
		this.game.on('playerTick', player => this.ticked.add(player));
	}

	save(force = true)
	{
		const time = new Date();
		if (force || (time - this.last > this.delay))
		{
			Array.from(this.ticked.entries()).map(item => item.compress()).forEach((item) =>
			{
				const hash = hashsum(item);
				if (this.hashes.has(item.id) && this.hashes.get(item.id) === hash) return;
				this.hashes.set(item.id, hash);
				if (item instanceof Quest) this.emit('save', 'quest', item);
				else if (item instanceof Chapter) this.emit('save', 'chapter', item);
				else if (item instanceof Game) this.emit('save', 'game', item);
			});
			this.last = time;
			this.ticked.clear();
		}
	}

	static parse(data)
	{
		const { game } = data;
		const chapters = new Map(Object.entries(data.chapters));
		const quests = new Map(Object.entries(data.quests));
		game.chapters = game.chapters.map((chapterID) =>
		{
			const chapter = chapters.get(chapterID);
			chapter.quests = chapter.quests.map(questID => quests.get(questID));
			return chapter;
		});
		return game;
	}
}

module.exports = { SaveManager };
