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
	}

	get name() { return this.information.name; }
	set name(name) { this.information.setName(name); }
	get race() { return this.information.raceName; }
	set race(race) { this.information.setRace(race); }

	get tickRate() { return 750 - this.attributes.proficiency * 3; }
	get xpMod() { return 1 + this.attributes.insight / 171; }
	get healthMod() { return this.attributes.constitution * 5; }
	get damageDealtMod() { return 1 + this.attributes.might / 171; }
	get damageTakenMod() { return this.attributes.fortitude / 171 * .25; }

	toString = () => `'${this.name}' the ${this.race}`;

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