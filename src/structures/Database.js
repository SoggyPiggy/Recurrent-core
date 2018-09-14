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
		this.mainDB = this.database.collection('main', { primaryKey: 'id' });
		this.chaptersDB = this.database.collection('chapters', { primaryKey: 'id' });
		this.questsDB = this.database.collection('quests', { primaryKey: 'id' });
		this.database.load(() =>
		{
			this.initialized = true;
			this.emit('ready');
		});
		this.saveHandler = {
			main: false,
			chapters: false,
			quests: false,
			all: () => this.saveHandler.main && this.saveHandler.chapters && this.saveHandler.quests,
			reset: () =>
			{
				this.saveHandler.main = false;
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
		return this.mainDB.find({ id: 'game' })[0];
	}

	saveGame(data)
	{
		this.mainDB.upsert({ id: 'game', data });
		this.saveHandler.main = true;
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
			if (this.saveHandler.main === true) this.mainDB.save();
			if (this.saveHandler.chapters === true) this.chaptersDB.save();
			if (this.saveHandler.quests === true) this.questsDB.save();
		}
		this.saveHandler.reset();
	}
}

module.exports = { Database };
