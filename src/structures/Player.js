const { EventBase } = require('./Bases');
const { PlayerAttributes } = require('./Player/Attributes');
const { PlayerGear } = require('./Player/Gear');
const { PlayerInformation } = require('./Player/Information');
const { PlayerStatus } = require('./Player/Status');
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
		this.gear = new PlayerGear(this, data.gear);
		this.experience = new PlayerExperience(this, data.experience);
		this.information = new PlayerInformation(this, data.information);
		this.status = new PlayerStatus(this, data.status);
	}

	get name()
	{
		return this.information.name;
	}

	set name(name)
	{
		this.information.setName(name);
	}

	get race()
	{
		return this.information.raceName;
	}

	set race(race)
	{
		this.information.setRace(race);
	}

	get charm()
	{
		return this.attributes.charm;
	}

	get constitution()
	{
		return this.attributes.constitution;
	}

	get fortitude()
	{
		return this.attributes.fortitude;
	}

	get fortuity()
	{
		return this.attributes.fortuity;
	}

	get insight()
	{
		return this.attributes.insight;
	}

	get might()
	{
		return this.attributes.might;
	}

	get perception()
	{
		return this.attributes.perception;
	}

	get proficiency()
	{
		return this.attributes.proficiency;
	}

	get stamina()
	{
		return this.attributes.stamina;
	}

	get charmMod()
	{
		return this.charm / 171;
	}

	get constitutionMod()
	{
		return this.constitution / 171;
	}

	get fortitudeMod()
	{
		return this.fortitude / 171;
	}

	get fortuityMod()
	{
		return this.fortuity / 171;
	}

	get insightMod()
	{
		return this.insight / 171;
	}

	get mightMod()
	{
		return this.might / 171;
	}

	get perceptionMod()
	{
		return this.perception / 171;
	}

	get proficiencyMod()
	{
		return this.proficiency / 171;
	}

	get staminaMod()
	{
		return this.stamina / 171;
	}

	toString()
	{
		return `'${this.name}' the ${this.race}`;
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'attributes',
			'coordinates',
			'gear',
			'experience',
			'information',
			'status',
		];
	}
}

module.exports = { Player };
