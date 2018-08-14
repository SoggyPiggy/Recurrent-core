const { EventEmitter } = require('events');
const RandomJs = require('random-js');

const Random = new RandomJs(RandomJs.engines.browserCrypto);

function stringify(data)
{
	return JSON.stringify(data, null, 3);
}

class Base
{
	constructor()
	{
		this.random = Random;
	}

	toString()
	{
		return stringify(this.toJSON());
	}

	// eslint-disable-next-line class-methods-use-this
	toJSON()
	{
		return {};
	}
}

class IDBase extends Base
{
	constructor(data = {})
	{
		super(data);
		this.id = typeof data.id !== 'undefined' ? data.id : Random.uuid4();
		this.created = typeof data.created !== 'undefined' ? data.created : new Date().getTime();
	}

	toJSON()
	{
		const data = super.toJSON();
		data.id = this.id;
		data.created = this.created;
		return data;
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

	toString()
	{
		return stringify(this.toJSON());
	}

	toJSON()
	{
		const data = {};
		data.id = this.id;
		data.created = this.created;
		return data;
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

	// eslint-disable-next-line class-methods-use-this
	tick()
	{}

	toJSON()
	{
		const data = super.toJSON();
		data.ticks = this.ticks;
		return data;
	}
}

module.exports = {
	Base,
	IDBase,
	EventBase,
	TickBase,
};
