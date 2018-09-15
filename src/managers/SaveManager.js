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
		this.database = data.database;
		this.hashes = new Map(data.hashes);
		this.ticked = new Set();
		this.game.on('chapterTick', () => this.ticked.add(this.game));
		this.game.on('chapterTick', chapter => this.ticked.add(chapter));
		this.game.on('questTick', quest => this.ticked.add(quest));
		this.interval = setInterval(() => this.save(), 1000 * 60);
		this.save();
	}

	processItem(item)
	{
		const { id } = item;
		const compression = item.compress();
		const hash = hashsum(compression);
		const hasChanged = !this.hashes.has(id) ? true : this.hashes.get(id) !== hash;
		return {
			item,
			id,
			hash,
			compression,
			hasChanged,
		};
	}

	save()
	{
		if (this.game.active) this.saveFrom(this.ticked);
		else
		{
			const items = new Set();
			items.add(this.game);
			this.game.chapters.forEach((chapter) =>
			{
				items.add(chapter);
				chapter.quests.forEach(quest => items.add(quest));
			});
			this.saveFrom(items);
		}
		this.database.save();
	}

	saveFrom(items)
	{
		Array.from(items.values()).forEach((item) =>
		{
			const data = this.processItem(item);
			if (data.hasChanged)
			{
				if (item instanceof Quest) this.database.saveQuest(data);
				else if (item instanceof Chapter) this.database.saveChapter(data);
			}
		});
		items.clear();
	}

	static buildSave(database)
	{
		if (!database) return {};
		const failedReturn = { savemanager: { database } };
		const gameData = database.game();
		if (!gameData) return failedReturn;
		if (gameData.hash !== hashsum(gameData.data)) return failedReturn;
		const chapters = database.chapters();
		if (!chapters.every(({ data, hash }) => hash === hashsum(data))) return failedReturn;
		const quests = database.quests();
		if (!quests.every(({ data, hash }) => hash === hashsum(data))) return failedReturn;
		const hashMap = new Map([[gameData.id, gameData.hash]]);
		const chapterMap = new Map();
		chapters.forEach(({ id, data, hash }) =>
		{
			chapterMap.set(id, data);
			hashMap.set(id, hash);
		});
		const questMap = new Map();
		quests.forEach(({ id, data, hash }) =>
		{
			questMap.set(id, data);
			hashMap.set(id, hash);
		});
		const { data } = gameData;
		data.chapters = data.chapters.map(id => chapterMap.get(id));
		data.chapters = data.chapters.map(chapter =>
			({
				...chapter,
				quests: chapter.quests.map(id => questMap.get(id)),
			}));
		data.savemanager = {
			database,
			hashes: hashMap,
		};
		return data;
	}
}

module.exports = { SaveManager };
