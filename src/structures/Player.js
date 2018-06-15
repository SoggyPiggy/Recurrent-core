const { TickBase } = require("./Bases");
const { ProgressManager } = require('./../managers/ProgressManager');

class Player extends TickBase
{
	constructor(data = {})
	{
		super(data);
		this.name = typeof data.name !== 'undefined' ? data.name : this.generateName();
		this.stats = this.generateStats(data.stats);
		if (typeof data.name === 'undefined') this.name = this.generateName();
		else this.name = data.name;
		if (typeof data.hp === 'undefined') this.health = 1;
		else this.hp = data.hp;
		this.stats = this.generateStats();
		this.progress = new ProgressManager();
	}

	get tickRate() { return 250 - this.stats.dexerity }
	get maxHP() { return 145 + (this.stats.constitution * 5) }
	get hp() { return this.health * this.maxHP }
	get xpMod() { return 1 + (1 * (this.stats.inteligence / 171)) }

	generateStats(data)
	{
		if (typeof data !== 'object') data = {};
		let skillNames = 
		[
			'strength', // Stronger attacks
			'constitution',// More health
			'dexerity', // Faster tick rate
			// 'luck', // Better chances
			'intelligence', // More XP
		]
		let total = skillNames.length * 100;
		let used = 0;
		for (let skill of skillNames)
		{
			if (typeof data[skill] === 'undefined') data[skill] = 0;
			else used += data[skill];
		}
		while (used < total)
		{
			let selected = this.random.pick(skillNames);
			if (data[selected] >= 150) continue;
			let adjust = 15 + this.random.integer(-7, 7);
			data[selected] += adjust;
			used += adjust;
		}
		return data;
	}

	generateName()
	{
		let names =
		[
			'Bob',
			'Jim',
			'Rob',
			'Tim',
			'Tom',
			'Han',
			'Zac'
		]
		return this.random.pick(names);
	}

	compress()
	{
		let data = super.compress();
		data.name = this.name;
		data
	}

	toString() {return `${this.name} - ${this._id}`;}
}

module.exports = { Player }