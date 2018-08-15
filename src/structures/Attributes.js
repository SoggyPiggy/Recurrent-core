const { Base } = require('./Bases');

class Attributes extends Base
{
	constructor(data = {})
	{
		super(data);
		this.core = Attributes.apply(data);
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

	generatePoints(selection, points, limit, increment, shift)
	{
		const data = Attributes.template();
		const total = selection.length * points;
		let used = 0;
		while (used < total)
		{
			const selected = this.random.pick(selection);
			if (data[selected] < limit)
			{
				const adjust = Math.round(increment + this.random.real(-shift, shift));
				data[selected] += adjust;
				used += adjust;
			}
		}
		return data;
	}

	randomize(points = 100, select = ['all'], duds = 0)
	{
		const selection = select.includes('all') ? Attributes.template() : [...select];
		const data = this.generatePoints(
			selection,
			points,
			points * 1.5,
			points * 0.15,
			points * 0.075,
		);
		if (duds > 0)
		{
			for (let i = 0; i < duds; i += 1)
			{
				const keys = Object.keys(data);
				const selected = this.random.pick(keys);
				delete data[selected];
			}
		}
		this.raw = Attributes.apply(data);
	}

	toJSON()
	{
		return { ...this.core };
	}

	static template()
	{
		const attributes = {};
		attributes.charm = 0;			// ????? (Maybe help with reputation)
		attributes.constitution = 0;	// More Health
		attributes.fortitude = 0;		// Damage Resistance
		attributes.fortuity = 0;		// Better Luck/Chances
		attributes.insight = 0;			// More XP
		attributes.might = 0;			// Stronger Attacks
		attributes.perception = 0;		// Accuracy
		attributes.proficiency = 0;	// Faster Tick Rate
		attributes.stamina = 0;			// Longer in the Field
		return attributes;
	}

	static apply(attribs = {})
	{
		return { ...Attributes.template(), ...attribs };
	}
}

module.exports = { Attributes };
