const { EventEmitter } = require('events');
const RandomJs = require('random-js');

const Random = new RandomJs(RandomJs.engines.browserCrypto);

class Base
{
	constructor()
	{
		this.random = Random;
	}

	toString()
	{
		return JSON.stringify(this.toJSON(), null, 3);
	}

	// eslint-disable-next-line class-methods-use-this
	jsonKeys()
	{
		return [];
	}

	toJSON()
	{
		const data = {};
		this.jsonKeys().forEach((key) =>
		{
			if (this[key] instanceof Base) data[key] = this[key].toJSON();
			else data[key] = this[key];
		});
		return data;
	}

	compress(stringify = false)
	{
		const data = {};
		this.jsonKeys().forEach((key) =>
		{
			// eslint-disable-next-line no-use-before-define
			if (this[key] instanceof IDBase) data[key] = this[key].id;
			else if (this[key] instanceof Base) data[key] = this[key].compress();
			else data[key] = this[key];
		});
		if (stringify) return JSON.stringify(data, null, 3);
		return data;
	}
}

class IDBase extends Base
{
	constructor(data)
	{
		super(data);
		this.id = typeof data.id !== 'undefined' ? data.id : Random.uuid4();
		this.created = typeof data.created !== 'undefined' ? data.created : new Date().getTime();
	}

	jsonKeys()
	{
		return [...super.jsonKeys(), 'id', 'created'];
	}
}

class ArrayBase extends Base
{
	constructor(data = [])
	{
		super();
		this.items = this.processItems(data);
	}

	get item()
	{
		return this.items[0];
	}

	processItems(items = [])
	{
		return items.map(item => this.processItem(item));
	}

	// eslint-disable-next-line class-methods-use-this
	processItem(item)
	{
		return item;
	}

	toJSON()
	{
		return this.items.map((item) =>
		{
			if (item instanceof Base) return item.toJSON();
			return item;
		});
	}

	compress()
	{
		return this.items.map((item) =>
		{
			if (item instanceof IDBase) return item.id;
			if (item instanceof Base) return item.toJSON();
			return item;
		});
	}
}

class ManagerBase extends ArrayBase
{
	constructor(data = [], parent = null)
	{
		super();
		this.parent = parent;
		this.items = this.processItems(data);
	}

	// eslint-disable-next-line class-methods-use-this
	generateItem()
	{
		return {};
	}

	newItem()
	{
		const item = this.generateItem();
		this.items.unshift(item);
		return item;
	}
}

class EventBase extends Base
{
	constructor(data)
	{
		super(data);
		this.eventHandler = new EventEmitter();
		Object.getOwnPropertyNames(Object.getPrototypeOf(this.eventHandler)).forEach((key) =>
		{
			if (key !== 'constructor' && typeof this.eventHandler[key] === 'function')
			{
				this[key] = this.eventHandler[key];
			}
		});
	}
}

class EventIDBase extends IDBase
{
	constructor(data)
	{
		super(data);
		this.eventHandler = new EventEmitter();
		Object.getOwnPropertyNames(Object.getPrototypeOf(this.eventHandler)).forEach((key) =>
		{
			if (key !== 'constructor' && typeof this.eventHandler[key] === 'function')
			{
				this[key] = this.eventHandler[key];
			}
		});
	}
}

class TickBase extends EventIDBase
{
	constructor(data)
	{
		super(data);
		this.interval = null;
		this.ticks = typeof data.ticks !== 'undefined' ? data.ticks : 0;
		this.on('tick', () =>
		{
			this.ticks += 1;
		});
		this.on('tick', () => this.tick());
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

	toggle()
	{
		if (this.active) this.deactivate();
		else this.activate();
	}

	// eslint-disable-next-line class-methods-use-this
	tick()
	{}

	jsonKeys()
	{
		return [...super.jsonKeys(), 'ticks'];
	}
}

module.exports = {
	Base,
	IDBase,
	ArrayBase,
	ManagerBase,
	EventBase,
	EventIDBase,
	TickBase,
};
