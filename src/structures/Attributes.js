const { Base } = require('./Bases');

class Attributes extends Base
{
	constructor(data = {}, settings = {})
	{
		this.raw = this.applyAttributes(data);
	}

	get charm() { return this.raw.charm; }
	get constitution() { return this.raw.constitution; }
	get fortitude() { return this.raw.fortitude; }
	get fortuity() { return this.raw.fortuity; }
	get insight() { return this.raw.insight; }
	get might() { return this.raw.might; }
	get perception() { return this.raw.perception; }
	get proficiency() { return this.raw.proficiency; }
	get stamina() { return this.raw.stamina; }

	allAttributes()
	{
		return [
			'charm',				// ????? (Maybe help with reputation)
			'constitution',	// More Health
			'fortitude',		// Damage Resistance
			'fortuity',	 		// Better Luck/Chances
			'insight',			// More XP
			'might',				// Stronger Attacks
			'perception',		// Accuracy
			'proficiency',		// Faster Tick Rate
			'stamina',			// Longer in the Field
		]
	}
	
	applyAttributes(attribs = {})
	{
		let data = {};
		let attributes = this.allAttributes();
		for (let attribute of attributes)
		{
			if (typeof attribs[attribute] !== 'undefined') data[attribute] = attribs[attribute];
			else data[attribute] = 0;
		}
		return data;
	}

	generatePoints(selection, points, limit, increment, shift)
	{
		let data = this.applyAttributes();
		let used = 0;
		let total = selection.length * points;
		while (used < total)
		{
			let selected = this.random.pick(selection);
			if (data[selected] >= limit) continue;
			let adjust = Math.round(increment + this.random.real(-shift, shift));
			data[selected] += adjust;
			used += adjust;
		}
		return data;
	}

	randomize(points = 100, selection = ['all'], duds = 0)
	{
		if (selection.includes('all')) selection = this.allAttributes();
		let data = this.generatePoints(selection, points, points * 1.5, points * .15, points * .075);
		if (duds > 0)
		{
			for (let i = 0; i < duds; i++)
			{
				let keys = Object.keys(data);
				let selected = this.random.pick(keys);
				delete data[selected];
			}
		}
		this.raw = this.applyAttributes(data);
	}

	compress()
	{
		let data = {};
		for (let attribute in this.raw) { data[attribute] = this.raw[attribute]; }
		return data;
	}
}

module.exports = { Attributes };