const hashsum = require('hash-sum');
const { EventEmitter } = require('events');
const { Chapter } = require('./../structures/Chapter');
const { Quest } = require('./../structures/Quest');

class SaveManager extends EventEmitter
{
	constructor(game, data = {})
	{
		super();
		this.game = game;
		this.last = new Date();
		this.delay = 1000 * 60;
		this.ticked = new Set();
		this.hashes = new Map(typeof data.hashes !== 'undefined' ? data.hashes : []);
		this.game.on('chapterTick', chapter => this.ticked.add(chapter));
		this.game.on('questTick', quest => this.ticked.add(quest));
		this.interval = setInterval(() => this.save(false), 1000 * 60 * 10);
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
		const compression = item.compress();
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

	static parse(storage)
	{
		if (!storage.has('game')) return {};
		const game = storage.get('game', { chapters: [] });
		game.chapters = game.chapters.map((chapterID) =>
		{
			const chapter = storage.get(`chapter.${chapterID}`, { quests: [] });
			chapter.quests = chapter.quests.map(questID => storage.get(`quest.${questID}`, {}));
			return chapter;
		});
		return game;
	}
}

module.exports = { SaveManager };
