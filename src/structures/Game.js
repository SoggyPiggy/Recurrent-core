const { EventBase } = require('./Bases');
const { ChapterManager } = require('./../managers/ChapterManager');
const { MasteryExperience } = require('./Game/Experience');

let instance;

class Game extends EventBase
{
	constructor(data = {})
	{
		super(data);
		this.chapters = new ChapterManager(this, data.chapters);
		this.mastery = new MasteryExperience(this, data.masetry);
	}

	get chapter()
	{
		return this.chapters.chapter;
	}

	get player()
	{
		return this.chapters.player;
	}

	toJSON()
	{
		const data = super.toJSON();
		data.chapters = this.chapters.toJSON();
		data.masetry = this.mastery.toJSON();
		return data;
	}

	static createInstance(data)
	{
		instance = new Game(data);
		return instance;
	}

	static getInstance(data)
	{
		return instance || Game.createInstance(data);
	}

	static get instance()
	{
		return Game.getInstance();
	}
}

module.exports = { Game };
