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
		return this.chapter.active;
	}

	get status()
	{
		if (!this.chapter) return 'no-chapter';
		if (this.chapter.ticks <= 0) return 'new-chapter';
		if (this.chapter.active) return 'active-chapter';
		return 'idle-chapter';
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
			instance = new Promise((resolve) =>
			{
				if (database.ready) resolve(new Game(SaveManager.buildSave(database)));
				else database.on('ready', () => resolve(new Game(SaveManager.buildSave(database))));
			}).then((value) =>
			{
				instance = value;
			}).catch(() =>
			{
				instance = new Game();
			});
		}
	}

	static get instance()
	{
		return instance;
	}
}

module.exports = { Game };
