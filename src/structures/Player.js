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

		Attributes.list.forEach((attribute) =>
		{
			Object.defineProperty(this, attribute, { get: () => this.attributes[attribute] });
			Object.defineProperty(this, `${attribute}Mod`, { get: () => this.attributes[attribute] / 171 });
		});
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
