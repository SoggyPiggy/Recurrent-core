const { Base } = require('./Bases');

class Attributes extends Base
{
	constructor(data = {})
	{
		super(data);
		this.core = Attributes.apply(data.core);
	}

	get charm()
	{
		return this.core.charm;
	}

	get constitution()
	{
		return this.core.constitution;
	}

	get fortitude()
	{
		return this.core.fortitude;
	}

	get fortuity()
	{
		return this.core.fortuity;
	}

	get insight()
	{
		return this.core.insight;
	}

	get might()
	{
		return this.core.might;
	}

	get perception()
	{
		return this.core.perception;
	}

	get proficiency()
	{
		return this.core.proficiency;
	}

	get stamina()
	{
		return this.core.stamina;
	}

	roll(points, selected = Attributes.list(), fails = 0)
	{
		let attributes;
		if (fails <= 0) attributes = Attributes.apply(this.generate(points, selected));
		else
		{
			const possiblities = [...selected, ...new Array(fails).fill().map(() => this.random.uuid4())];
			const selection = this.random.sample(possiblities, selected.length);
			attributes = Attributes.apply(this.generate(points, selection));
		}
		this.core = attributes;
	}

	generate(points = 100, selection = Attributes.list())
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

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'core',
		];
	}

	static list()
	{
		return [
			'charm',				// ????? (Maybe help with reputation)
			'constitution',	// More Health
			'perseverance',	// Damage Resistance
			'fortuity',			// Better Luck/Chances
			'insight',			// More XP
			'might',				// Stronger Attacks
			'perception',		// Accuracy
			'proficiency',		// Faster Tick Rate
			'stamina',			// Longer in the Field
		];
	}

	static template(list = Attributes.list())
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
		const list = Attributes.list();
		Object.keys(attributes).forEach((attribute) =>
		{
			if (!list.includes(attribute)) delete attributes[attribute];
		});
		return { ...Attributes.template(), ...attributes };
	}
}

module.exports = { Attributes };
