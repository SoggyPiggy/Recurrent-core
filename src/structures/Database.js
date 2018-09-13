const { EventEmitter } = require('events');
const ForerunnerDB = require('forerunnerdb');
const pathJoin = require('path').join;

class Database extends EventEmitter
{
	constructor(...args)
	{
		super();
		this.initialized = false;
		this.forerunner = new ForerunnerDB();
		this.database = this.forerunner.db('recurrent');
		this.database.persist.dataDir(pathJoin(...args));
		this.database.persist.addStep(new this.database.shared.plugins.FdbCrypto({ pass: 'rcrrnt' }));
		this.gameDB = this.database.collection('game', { primaryKey: 'id', size: 1, capped: true });
		this.chaptersDB = this.database.collection('chapters', { primaryKey: 'id' });
		this.questsDB = this.database.collection('quests', { primaryKey: 'id' });
		this.database.load(() =>
		{
			this.initialized = true;
			this.emit('ready');
		});
		this.saveHandler = {
			game: false,
			chapters: false,
			quests: false,
			all: () => this.saveHandler.game && this.saveHandler.chapters && this.saveHandler.quests,
			reset: () =>
			{
				this.saveHandler.game = false;
				this.saveHandler.chapters = false;
				this.saveHandler.quests = false;
			},
		};
	}

	get ready()
	{
		return this.initialized;
	}

	game()
	{
		if (!this.ready) return null;
		return this.gameDB.find({})[0];
	}

	saveGame(data)
	{
		this.gameDB.upsert(data);
		this.saveHandler.game = true;
	}

	chapters()
	{
		if (!this.ready) return [];
		return this.chaptersDB.find({});
	}

	saveChapter(data)
	{
		this.chaptersDB.upsert(data);
		this.saveHandler.chapters = true;
	}

	quests()
	{
		if (!this.ready) return [];
		return this.chaptersDB.find({});
	}

	saveQuest(data)
	{
		this.questsDB.upsert(data);
		this.saveHandler.quests = true;
	}

	save()
	{
		if (this.saveHandler.all() === true) this.database.save();
		else
		{
			if (this.saveHandler.game === true) this.gameDB.save();
			if (this.saveHandler.chapters === true) this.chaptersDB.save();
			if (this.saveHandler.quests === true) this.questsDB.save();
		}
		this.saveHandler.reset();
	}
}

module.exports = { Database };
