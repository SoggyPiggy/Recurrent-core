const decimal = require('decimal.js');
const { EventBase } = require('./Bases');
const { ActorAttributes } = require('./Actor/Attributes');
const { ActorEquipment } = require('./Actor/Equipment');

class Actor extends EventBase
{
	constructor(chapter, data = {})
	{
		super(data);
		this.chapter = chapter;
		this.$health = new decimal(typeof data.$health !== 'undefined' ? data.$health : 1);
		this.attributes = new ActorAttributes(this, data.attributes);
		this.equipment = new ActorEquipment(this, data.equipment);
		this.name = typeof data.name !== 'undefined' ? data.name : this.generateName();
		this.xp = typeof data.xp !== 'undefined' ? data.xp : 0;
	}

	get healthMax() { return 145 + (this.attributes.constitution * 5); }
	get health() { return this.$health.times(this.healthMax).ceil().toNumber(); }
	get dead() { return this.$health.lte(0); }
	get level() { return Math.floor(Math.pow(this.xp, (2 / 5)) + 1); }

	get tickRate() { return 750 - this.attributes.proficiency * 3; }
	get xpMod() { return 1 + this.attributes.insight / 171; }
	get healthMod() { return this.attributes.constitution * 5; }
	get damageDealtMod() { return 1 + this.attributes.might / 171; }
	get damageTakenMod() { return this.attributes.fortitude / 171 * .25; }

	dealDamage()
	{
		return 1;
	}

	takeDamage(damage)
	{
		if (this.dead) return;
		damage = new decimal(damage);
		this.$health = this.$health.minus(damage.div(this.healthMax));
		this.deathCheck();
	}

	deathCheck()
	{
		if (!this.dead) return false;
		this.emit('died');
		return true;
	}

	gainXP(xp)
	{
		xp *= this.xpMod;
		let pre = this.level;
		this.xp += xp;
		let post = this.level;
		if (post > pre) this.processLevels(levels);
	}

	processLevels(levels = 0)
	{
		for (let i = 0; i < levels; i++)
		{
			// TODO: Yeah, do something when they level up.
		}
	}

	generateName()
	{
		let names = ['Bob', 'Jim', 'Rob', 'Tim', 'Tom', 'Han', 'Zac'];
		return this.random.pick(names);
	}

	toString() { return `${this.name} - ${this._id}`; }

	compress()
	{
		let data = super.compress();
		data.$health = this.$health.toString();
		data.attributes = this.attributes.compress();
		data.equipment = this.equipment.compress();
		data.name = this.name;
		data.xp = this.xp;
		return data;
	}
}

// class ActorEquipment
// {
// 	constructor(actor, data = {})
// 	{
// 		this.actor = actor;
// 		this.random = this.actor.random;
// 	}
// }

// class ActorAttributes
// {
// 	constructor(actor, data = {})
// 	{
// 		this.actor = actor;
// 		this.random = this.actor.random;
// 		this.raw = {};
// 		this.generate(data);
// 	}

// 	get charm() { return this.raw.charm; }
// 	get fortuity() { return this.raw.fortuity; }
// 	get constitution() { return this.raw.constitution; }
// 	get fortitude() { return this.raw.fortitude; }
// 	get might() { return this.raw.might; }
// 	get perception() { return this.raw.perception; }
// 	get proficiency() { return this.raw.proficiency; }
// 	get stamina() { return this.raw.stamina; }
// 	get insight() { return this.raw.insight; }

// 	attributes()
// 	{
// 		return [
// 			'charm',				//	????? (Maybe help with reputation)
// 			'fortuity',	 		//	Better Luck/Chances
// 			'constitution',	//	More Health
// 			'fortitude',		//	Damage Resistance
// 			'might',				//	Stronger Attacks
// 			'perception',		//	Accuracy
// 			'proficiency',		//	Faster Tick Rate
// 			'stamina',			//	Longer in the Field
// 			'insight',			//	More XP
// 		]
// 	}

// 	generate(data = {})
// 	{
// 		let attributes = this.attributes();
// 		let total = attributes.length * 100
// 		let used = 0;
// 		for (let attribute of attributes)
// 		{
// 			if (typeof data[attribute] === 'undefined') this.raw[attribute] = 0;
// 			else
// 			{
// 				this.raw[attribute] = data[attribute];
// 				used += data[attribute];
// 				attributes = attributes.filter(a => a !== attribute);
// 			}
// 		}
// 		while ((attributes.length >= 1) && (used < total))
// 		{
// 			let selected = this.random.pick(attributes);
// 			if (this.raw[selected] >= 150) continue;
// 			let adjust = 15 + this.random.integer(-7, 7);
// 			this.raw[selected] += adjust;
// 			used += adjust;
// 		}
// 	}

// 	compress()
// 	{
// 		let data = {};
// 		let attributes = this.attributes();
// 		for (let attribute of attributes)
// 		{
// 			data[attribute] = this.raw[attribute];
// 		}
// 		return data;
// 	}
// }

module.exports = { Actor };