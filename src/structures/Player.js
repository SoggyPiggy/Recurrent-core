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

	get charm() { return this.attributes.charm; }
	get constitution() { return this.attributes.constitution; }
	get fortitude() { return this.attributes.fortitude; }
	get fortuity() { return this.attributes.fortuity; }
	get insight() { return this.attributes.insight; }
	get might() { return this.attributes.might; }
	get perception() { return this.attributes.perception; }
	get proficiency() { return this.attributes.proficiency; }
	get stamina() { return this.attributes.stamina; }

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

module.exports = { Player };