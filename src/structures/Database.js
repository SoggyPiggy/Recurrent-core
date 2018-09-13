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
	}

	get ready()
	{
		return this.initialized;
	}
}

module.exports = { Database };
