const { EventIDBase } = require('./Bases');
const { ChapterManager } = require('./../managers/ChapterManager');
const { MasteryExperience } = require('./Game/Experience');
const { SaveManager } = require('./../managers/SaveManager');

let instance;

class Game extends EventIDBase
{
	constructor(data = {})
	{
		const save = SaveManager.parse(data.storage);
		super(save);
		this.chapters = new ChapterManager(this, save.chapters);
		this.mastery = new MasteryExperience(this, save.mastery);
		this.savemanager = new SaveManager(this, data.storage);
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
		else if (database.ready) instance = new Game(SaveManager.buildSave(database));
		else
		{
			instance = new Promise((resolve) =>
			{
				database.on('ready', () =>
				{
					resolve(new Game(SaveManager.buildSave(database)));
				});
			}).then((value) =>
			{
				instance = value;
			});
		}
	}

	static get instance()
	{
		return instance;
	}
}

module.exports = { Game };
