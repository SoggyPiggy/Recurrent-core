const { EventEmitter } = require('events');
const RandomJs = require('random-js');

const Random = new RandomJs(RandomJs.engines.browserCrypto);

class Base
{
	constructor(data = {})
	{
		this.id = typeof data.id !== 'undefined' ? data.id : Random.uuid4();
		this.created = typeof data.created !== 'undefined' ? data.created : new Date().getTime();
		this.random = Random;
	}

	compress()
	{
		const data = {};
		data.id = this.id;
		data.created = this.created;
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
		this.id = typeof data.id !== 'undefined' ? data.id : Random.uuid4();
		this.created = typeof data.created !== 'undefined' ? data.created : new Date().getTime();
		this.random = Random;
	}

	compress()
	{
		const data = {};
		data.id = this.id;
		data.created = this.created;
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
		this.interval = null;
		this.ticks = typeof data.ticks !== 'undefined' ? data.ticks : 0;
		this.on('tick', () =>
		{
			this.ticks += 1;
		});
		this.on('tick', () => this.tick());
		this.on('start', () => this.activate());
		this.on('end', () => this.deactivate());
	}

	get active()
	{
		return this.interval !== null;
	}

	activate(rate = 1000)
	{
		if (this.active) this.deactivate();
		this.interval = setInterval(() => this.emit('tick'), rate);
	}

	deactivate()
	{
		clearInterval(this.interval);
		this.interval = null;
	}

	tick() // eslint-disable-line class-methods-use-this
	{}

	compress()
	{
		const data = {};
		data.id = this.id;
		data.created = this.created;
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

module.exports = { Base, EventBase, TickBase };
