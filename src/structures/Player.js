const { EventBase } = require('./Bases');
const { PlayerAttributes } = require('./Player/Attributes');
const { PlayerEquipment } = require('./Player/Equipment');
const { PlayerInformation } = require('./Player/Information');
const { PlayerStatus }= require('./Player/Status');
const { PlayerExperience } = require('./Player/Experience');

class Player extends EventBase
{
	constructor(chapter, data = {})
	{
		super(data);
		this.chapter = chapter;
		this.attributes = new PlayerAttributes(this, data.attributes);
		this.equipment = new PlayerEquipment(this, data.equipment);
		this.information = new PlayerInformation(this, data.information);
		this.status = new PlayerStatus(this, data.status);
		this.experience = new PlayerExperience(this, data.experience);
		this.xp = typeof data.xp !== 'undefined' ? data.xp : 0;
		this.health = typeof data.health !== 'undefined' ? data.health : this.healthMax;
	}

	get name() { return this.information.name; }
	set name(name) { this.information.setName(name); }
	get race() { return this.information.raceName; }
	set race(race) { this.information.setRace(race); }

	get healthMax() { return 145 + (this.attributes.constitution * 5); }
	get dead() { return this.health <= 0; }
	get level() { return Math.floor(Math.pow(this.xp, (2 / 5)) +1); }
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
		this.health -= damage;
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

	toString() { return `${this.name} - ${this._id}`; }

	compress()
	{
		let data = super.compress();
		data.attributes = this.attributes.compress();
		data.equipment = this.equipment.compress();
		data.information = this.information.compress();
		data.status = this.status.compress();
		data.experience = this.experience.compress();
		return data;
	}
}