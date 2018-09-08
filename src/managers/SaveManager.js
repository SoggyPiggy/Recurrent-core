const hashsum = require('hash-sum');
const { EventEmitter } = require('events');
const { Chapter } = require('./../structures/Chapter');
const { Quest } = require('./../structures/Quest');

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
	}

	save(force = true)
	{
		const time = new Date();
		if (force || (time - this.last > this.delay))
		{
			Array.from(this.ticked.values()).forEach((item) =>
			{
				if (item instanceof Quest) this.saveItem(item, 'quest');
				else if (item instanceof Chapter) this.saveItem(item, 'chapter');
			});
			this.saveItem(this.game, 'game');
			this.last = time;
			this.ticked.clear();
		}
	}

	saveItem(item, type)
	{
		const { id } = item;
		const compression = this.item.compress();
		const hash = hashsum(compression);
		if (this.hashes.has(id) && this.hashes.get(id) === hash) return;
		this.hashes.set(id, hash);
		this.emit('save', {
			id,
			type,
			hash,
			compression,
		});
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
