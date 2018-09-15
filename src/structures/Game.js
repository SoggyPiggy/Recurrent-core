const { EventIDBase } = require('./Bases');
const { ChapterManager } = require('./../managers/ChapterManager');
const { MasteryExperience } = require('./Game/Experience');
const { SaveManager } = require('./../managers/SaveManager');

let instance;

class Game extends EventIDBase
{
	constructor(data = {})
	{
		super(data);
		this.chapters = new ChapterManager(this, data.chapters);
		this.mastery = new MasteryExperience(this, data.mastery);
		this.savemanager = new SaveManager(this, data.savemanager);
	}

	get chapter()
	{
		return this.chapters.chapter;
	}

	get player()
	{
		return this.chapters.player;
	}

	get quest()
	{
		return this.chapter.quest;
	}

	get objective()
	{
		return this.chapter.objective;
	}

	get active()
	{
		return this.chapter ? this.chapter.active : false;
	}

	get status()
	{
		if (!this.chapter) return 'no-chapter';
		if (this.chapter.ticks <= 0) return 'new-chapter';
		if (this.chapter.active) return 'active-chapter';
		return 'idle-chapter';
	}

	get database()
	{
		return this.savemanager.database;
	}

	newChapter()
	{
		this.chapters.newChapter();
		this.player.roll();
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'chapters',
			'mastery',
		];
	}

	static createInstance(database)
	{
		if (!database) instance = new Game();
		else
		{
			return new Promise((resolve) =>
			{
				if (database.ready) resolve();
				else database.on('ready', () => resolve());
			}).then(() =>
			{
				instance = new Game(SaveManager.buildSave(database));
			}).catch(() =>
			{
				instance = new Game();
			});
		}
		return instance;
	}

	static get instance()
	{
		return instance;
	}
}

module.exports = { Game };
