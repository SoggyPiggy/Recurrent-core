const { EventEmitter } = require("events");
const RandomJs = require("random-js");
const Random = new RandomJs(RandomJs.engines.browserCrypto);

class Base
{
	constructor(data = {})
	{
		this._id = typeof data._id !== 'undefined' ? data._id : Random.uuid4();
		this._created = typeof data._created !== 'undefined' ? data._created : new Date().getTime();
		this.random = Random;
	}

	compress()
	{
		let data = {};
		data._id = this._id;
		data._created = this._created;
		return data;
	}

	toString()
	{
		return JSON.stringify(this.compress(), null, '\t');
	}

	toJSON()
	{
		return JSON.stringify(this.compress());
	}
}

class TickBase extends EventEmitter
{
	constructor(data = {})
	{
		super();
		this._id = typeof data._id !== 'undefined' ? data._id : Random.uuid4();
		this._created = typeof data._created !== 'undefined' ? data._created : new Date().getTime();
		this._ticks = typeof data._ticks !== 'undefined' ? data._ticks : 0;
		this._interval = null;
		this.random = Random;
		this.on('tick', () => this._ticks++);
		this.on('tick', this.tick);
		this.on('start', this.activate);
		this.on('end', this.deactivate);
	}

	get active()
	{
		return this._interval !== null;
	}

	activate(rate = 1000)
	{
		this._interval = setInterval(() => this.emit('tick'), rate);
	}

	deactivate()
	{
		clearInterval(this._interval);
		this._interval = null;
	}

	tick()
	{}

	compress()
	{
		let data = {};
		data._id = this._id;
		data._created = this._created;
		data._ticks = this._ticks;
		return data;
	}

	toString()
	{
		return JSON.stringify(this.compress(), null, '\t');
	}

	toJSON()
	{
		return JSON.stringify(this.compress());
	}
}

class ActorBase extends TickBase
{
	constructor(data)
	{
		super(data);
		this.name = typeof data.name !== 'undefined' ? data.name : this.generateName();
		this.stats = this.generateStats(data.stats);
		this.health = typeof data.health !== 'undefined' ? data.health : 1;
	}

	generateStats(data)
	{
		let settings = { Avg: 100, Max: 150, Adjust: 15, MicroAdjust: 7, }
		if (typeof data === 'undefined') data = {};
		let skillNames =
		[
			'strength', // Stronger attacks
			'constitution',// More health
			'dexerity', // Faster tick rate
			// 'luck', // Better chances
			'intelligence', // More XP
		]
		let max = skillNames.length * settin;
		let used = 0;
		for (let skill of skillNames)
		{
			if (typeof data[skill] === 'undefined') data[skill] = 0;
			else used += data[skill];
		}
		while (used < max)
		{
			let selected = this.random.pick(skillNames);
			if (data[selected] >= 150) continue;
			let adjust
		}
	}
}

module.exports = { Base, TickBase }