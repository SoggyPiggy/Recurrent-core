const { Base } = require('./Bases');

class Attributes extends Base
{
	constructor(data = {})
	{
		super(data);
		this.core = Attributes.apply(data.core);

		Attributes.list.forEach((attribute) =>
		{
			Object.defineProperty(this, attribute, { get: () => this.core[attribute] });
		});
	}

	roll(points, selected = Attributes.list, fails = 0)
	{
		let attributes;
		if (fails <= 0) attributes = Attributes.apply(this.generate(points, selected));
		else
		{
			const possibilities = [...selected, ...new Array(fails).fill().map(() => this.random.uuid4())];
			const selection = this.random.sample(possibilities, selected.length);
			attributes = Attributes.apply(this.generate(points, selection));
		}
		this.core = attributes;
	}

	generate(points = 100, selection = Attributes.list)
	{
		const attributes = Attributes.template(selection);
		const limit = points * 1.5;
		const increment = points * 0.15;
		const shift = points * 0.075;
		const total = selection.length * points;
		let used = 0;
		while (used < total)
		{
			const selected = this.random.pick(selection);
			if (attributes[selected] < limit)
			{
				const adjust = Math.round(increment + this.random.real(-shift, shift));
				attributes[selected] += adjust;
				used += adjust;
			}
		}
		return attributes;
	}

	toString()
	{
		return Attributes.list.map(attribute => `${attribute}: ${this[attribute]}`).join(', ');
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'core',
		];
	}

	static get list()
	{
		return [
			'awareness',		// Searching		AWR
			'charm',				// Interactions	CHA
			'constitution',	// Health			CON
			'determination',	// Stamina			DET
			'fortuity',			// Luck				FOR
			'ingenuity',		// Crafting			ING
			'insight',			// XP					INS
			'might',				// Attacks			MIT
			'proficiency',		// Tick rate		PRO
		];
	}

	static template(list = Attributes.list)
	{
		const attributes = {};
		list.forEach((attribute) =>
		{
			attributes[attribute] = 0;
		});
		return attributes;
	}

	static apply(attribs = {})
	{
		const attributes = { ...attribs };
		Object.keys(attributes).forEach((attribute) =>
		{
			if (!Attributes.list.includes(attribute)) delete attributes[attribute];
		});
		return { ...Attributes.template(), ...attributes };
	}
}

module.exports = { Attributes };
