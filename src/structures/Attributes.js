const { Base } = require('./Bases');

class Attributes extends Base
{
	constructor(data = {})
	{
		super(data);
		this.raw = this.applyAttributes(data);
	}

	get charm()
	{
		return this.raw.charm;
	}

	get constitution()
	{
		return this.raw.constitution;
	}

	get fortitude()
	{
		return this.raw.fortitude;
	}

	get fortuity()
	{
		return this.raw.fortuity;
	}

	get insight()
	{
		return this.raw.insight;
	}

	get might()
	{
		return this.raw.might;
	}

	get perception()
	{
		return this.raw.perception;
	}

	get proficiency()
	{
		return this.raw.proficiency;
	}

	get stamina()
	{
		return this.raw.stamina;
	}

	static allAttributes()
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

	applyAttributes(attribs = {})
	{
		return { ...this.allAttributes(), ...attribs };
	}

	generatePoints(selection, points, limit, increment, shift)
	{
		const data = this.applyAttributes();
		let used = 0;
		const total = selection.length * points;
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
		const selection = select.includes('all') ? this.allAttributes() : [...select];
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
		this.raw = this.applyAttributes(data);
	}

	compress()
	{
		return { ...this.raw };
	}
}

module.exports = { Attributes };
