const { Base } = require('./../Bases');
const { races } = require('./../../resources');

class PlayerInformation extends Base
{
	constructor(player, data = {})
	{
		super();
		this.player = player;
		this.race = typeof data.race !== 'undefined'
			? races.find(race => race.id === data.race)
			: this.random.pick(races);
		this.name = typeof data.name !== 'undefined' ? data.name : this.race.randomName();
		this.nameLock = typeof data.nameLock !== 'undefined' ? data.nameLock : false;
		this.height = typeof data.height !== 'undefined' ? data.height : this.race.randomHeight();
	}

	randomizeRace()
	{
		this.setRace(this.random.pick(races));
	}

	randomizeName()
	{
		this.setName(this.race.randomName(), false);
	}

	randomizeHeight()
	{
		this.setHeight(this.race.randomHeight());
	}

	setRace(race)
	{
		if (races.includes(race)) this.race = race;
		else return;
		if (!this.nameLock) this.randomizeName();
		this.randomizeHeight();
	}

	setName(name, locked = true)
	{
		this.name = name;
		this.nameLock = locked;
	}

	setHeight(height)
	{
		if (height < this.race.minHeight || height > this.race.maxHeight) return;
		this.height = height;
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			['race', 'race.id'],
			'name',
			'nameLock',
			'height',
		];
	}
}

module.exports = { PlayerInformation };
