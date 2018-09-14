const hashsum = require('hash-sum');
const { EventEmitter } = require('events');
const { Chapter } = require('./../structures/Chapter');
const { Quest } = require('./../structures/Quest');
const { version } = require('./../../package.json');

const fakeStorage = {
	get: (key, value = null) => value,
	set: () => null,
	has: () => null,
	remove: () => null,
	clear: () => null,
	store: {},
};

class SaveManager extends EventEmitter
{
	constructor(game, data)
	{
		super();
		this.game = game;
		this.database = data.database;
		this.hashes = new Map(data.hashes);
		this.ticked = new Set();
		this.game.on('chapterTick', chapter => this.ticked.add(chapter));
		this.game.on('questTick', quest => this.ticked.add(quest));
		this.interval = setInterval(() => this.save(), 1000 * 60 * 10);
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
		Array.from(this.ticked.values()).forEach((item) =>
		{
			const data = this.processItem(item);
			if (data.hasChanged)
			{
				if (item instanceof Quest) this.database.saveQuest(data.id, data.compression, data.hash);
				else if (item instanceof Chapter) this.database.saveChapter(data.id, data.compression, data.hash);
			}
		});
		const data = this.processItem(this.game);
		if (data.hasChanged) this.saveItem(data, 'game');
		this.ticked.clear();
	}

	saveItem(data, key)
	{
		this.hashes.set(data.id, data.hash);
		this.database.set(key, data.compression);
		this.database.set(`hashes.${data.id}`, data.hash);
		this.emit('save', { ...data, key });
	}

	saveAll()
	{
		const data = {
			game: this.game.compress(),
			chapters: {},
			quests: {},
			hashes: {},
		};
		data.hashes[this.game.id] = hashsum(data.game);
		const chapters = new Map(this.game.chapters.map(chapter => [chapter.id, chapter]));
		data.game.chapters.forEach((chapterID) =>
		{
			const chapter = chapters.get(chapterID);
			const chapterCompression = chapter.compress();
			data.chapters[chapterID] = chapterCompression;
			data.hashes[chapterID] = hashsum(chapterCompression);
			const quests = new Map(chapter.quests.map(quest => [quest.id, quest]));
			chapterCompression.quests.forEach((questID) =>
			{
				const quest = quests.get(questID);
				const questCompression = quest.compress();
				data.quests[questID] = questCompression;
				data.hashes[questID] = hashsum(questCompression);
			});
		});
		return data;
	}

	static buildSave(database)
	{
		if (!database) return {};
		const gameData = database.game();
		if (!gameData) return {};
		if (gameData.hash !== hashsum(gameData.data)) return {};
		const chapters = database.chapters();
		if (!chapters.every(({ data, hash }) => hash === hashsum(data))) return {};
		const quests = database.quests();
		if (!quests.every(({ data, hash }) => hash === hashsum(data))) return {};
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
		data.chapters = data.chapters.map((chapterID) =>
		{
			const chapter = chapterMap.get(chapterID);
			chapter.quests = chapter.quests.map(questID => questMap.get(questID));
			return chapter;
		});
		data.savemanager = {
			database,
			hashes: hashMap,
		};
		return data;
	}
}

module.exports = { SaveManager };
