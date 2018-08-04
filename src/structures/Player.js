const { EventBase } = require('./Bases');
const { PlayerAttributes } = require('./Player/Attributes');
const { PlayerEquipment } = require('./Player/Equipment');
const { PlayerInformation } = require('./Player/Information');
const { PlayerStatus }= require('./Player/Status');
const { PlayerExperience } = require('./Player/Experience');
const { PlayerCoordinates } = require('./Player/Coordinates');

class Player extends EventBase
{
	constructor(chapter, data = {})
	{
		super(data);
		this.chapter = chapter;
		this.attributes = new PlayerAttributes(this, data.attributes);
		this.coordinates = new PlayerCoordinates(this, data.coordinates);
		this.equipment = new PlayerEquipment(this, data.equipment);
		this.experience = new PlayerExperience(this, data.experience);
		this.information = new PlayerInformation(this, data.information);
		this.status = new PlayerStatus(this, data.status);
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

	toString() { return `'${this.name}' the ${this.race}` };

	compress()
	{
		let data = super.compress();
		data.attributes = this.attributes.compress();
		data.coordinates = this.coordinates.compress();
		data.equipment = this.equipment.compress();
		data.experience = this.experience.compress();
		data.information = this.information.compress();
		data.status = this.status.compress();
		return data;
	}
}

module.exports = { Player };