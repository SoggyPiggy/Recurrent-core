const { EventEmitter } = require('events');
const { random } = require('./../utils/random');

const parseDot = function parseDotNotationFromObject(keys, data)
{
	return keys.split('.').reduce((temp, key) => temp[key], data);
};

class Base
{
	constructor()
	{
		this.random = random;
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
			if (typeof key === 'string')
			{
				if (this[key] instanceof Base) data[key] = this[key].toJSON();
				else data[key] = this[key];
			}
			else data[key[0]] = parseDot(key[1], this);
		});
		return data;
	}

	compress(stringify = false)
	{
		const data = {};
		this.jsonKeys().forEach((key) =>
		{
			if (typeof key === 'string')
			{
				// eslint-disable-next-line no-use-before-define
				if (this[key] instanceof IDBase) data[key] = this[key].id;
				else if (this[key] instanceof Base) data[key] = this[key].compress();
				else data[key] = this[key];
			}
			else data[key[0]] = parseDot(key[1], this);
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
		// eslint-disable-next-line no-underscore-dangle
		this.id = typeof data.id !== 'undefined' ? data.id : random.uuid4();
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
		Object.getOwnPropertyNames(Object.getPrototypeOf(this.items)).forEach((key) =>
		{
			if (key !== 'constructor' && typeof this.items[key] === 'function')
			{
				this[key] = (...args) => this.items[key](...args);
			}
		});
	}

	get length()
	{
		return this.items.length;
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
			if (item instanceof Base) return item.compress();
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
				this[key] = (...args) => this.eventHandler[key](...args);
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
				this[key] = (...args) => this.eventHandler[key](...args);
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
