const hashsum = require('hash-sum');
const { EventEmitter } = require('events');
const { Chapter } = require('./../structures/Chapter');
const { Quest } = require('./../structures/Quest');
const { version } = require('./../../package.json');

const fakeStorage = {
	get: (key, value = null) => value,
	set: () => null,
	remove: () => null,
	clear: () => null,
	store: {},
};

class SaveManager extends EventEmitter
{
	constructor(game, storage = fakeStorage)
	{
		super();
		this.game = game;
		this.storage = storage;
		this.hashes = new Map(Object.entries(storage.get('hashes', {})));
		this.ticked = new Set();
		this.game.on('chapterTick', chapter => this.ticked.add(chapter));
		this.game.on('questTick', quest => this.ticked.add(quest));
		this.interval = setInterval(() => this.save(), 1000 * 60 * 10);
		this.storage.set('version', version);
	}

	processItem(item)
	{
		const { id } = item;
		const compression = item.compress();
		const hash = hashsum(compression);
		const isNew = !this.hashes.has(id);
		const hasChanged = isNew ? true : this.hashes.get(id) !== hash;
		return {
			item,
			id,
			hash,
			compression,
			isNew,
			hasChanged,
		};
	}

	save()
		{
			Array.from(this.ticked.values()).forEach((item) =>
			{
			const data = this.processItem(item);
			if (!data.isNew || !data.hasChanged) return;
			if (item instanceof Quest) this.saveItem(data, `quests.${item.id}`);
			else if (item instanceof Chapter) this.saveItem(data, `chapters.${item.id}`);
			});
		const data = this.processItem(this.game);
		this.saveItem(data, 'game');
			this.ticked.clear();
		}

	saveItem(data, key)
	{
		this.hashes.set(data.id, data.hash);
		this.storage.set(key, data.compression);
		this.storage.set(`hashes.${data.id}`, data.hash);
		this.emit('save', { ...data, key });
	}
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
			const chapter = storage.get(`chapters.${chapterID}`, { quests: [] });
			chapter.quests = chapter.quests.map(questID => storage.get(`quests.${questID}`, {}));
			return chapter;
		});
		return game;
	}
}

module.exports = { SaveManager };
