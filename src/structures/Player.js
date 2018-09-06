const { EventBase } = require('./Bases');
const { Attributes } = require('./Attributes');
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
		this.attributes = new Attributes(data.attributes);
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

	get awareness()
	{
		return this.attributes.awareness;
	}

	get awarenessMod()
	{
		return this.awareness / 171;
	}

	get charm()
	{
		return this.attributes.charm;
	}

	get charmMod()
	{
		return this.charm / 171;
	}

	get constitution()
	{
		return this.attributes.constitution;
	}

	get constitutionMod()
	{
		return this.constitution / 171;
	}

	get determination()
	{
		return this.attributes.determination;
	}

	get determinationMod()
	{
		return this.determination / 171;
	}

	get fortuity()
	{
		return this.attributes.fortuity;
	}

	get fortuityMod()
	{
		return this.fortuity / 171;
	}

	get ingenuity()
	{
		return this.attributes.ingenuity;
	}

	get ingenuityMod()
	{
		return this.ingenuity / 171;
	}

	get insight()
	{
		return this.attributes.insight;
	}

	get insightMod()
	{
		return this.insight / 171;
	}

	get might()
	{
		return this.attributes.might;
	}

	get mightMod()
	{
		return this.might / 171;
	}

	get proficiency()
	{
		return this.attributes.proficiency;
	}

	get proficiencyMod()
	{
		return this.proficiency / 171;
	}

	roll()
	{
		if (this.chapter.ticks > 0) return;
		this.attributes.roll(100);
		this.status.reset();
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
