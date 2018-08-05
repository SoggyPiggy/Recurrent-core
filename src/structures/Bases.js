const { EventEmitter } = require('events');
const RandomJs = require('random-js');
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

class EventBase extends EventEmitter
{
	constructor(data = {})
	{
		super();
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

class TickBase extends EventBase
{
	constructor(data = {})
	{
		super(data);
		this._interval = null;
		this.ticks = typeof data.ticks !== 'undefined' ? data.ticks : 0;
		this.on('tick', () => this.ticks++);
		this.on('tick', () => this.tick());
		this.on('start', () => this.activate());
		this.on('end', () => this.deactivate());
	}

	get active() { return this._interval !== null; }

	activate(rate = 1000)
	{
		if (this.active) this.deactivate();
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
		data.ticks = this.ticks;
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

module.exports = { Base, EventBase, TickBase }