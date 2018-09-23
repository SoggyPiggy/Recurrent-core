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
		let race;
		do race = this.random.pick(races);
		while (race === this.race);
		this.setRace(race);
	}

	randomizeName()
	{
		let name;
		do name = this.race.randomName();
		while (name === this.name);
		this.setName(name, false);
	}

	randomizeHeight()
	{
		let height;
		do height = this.race.randomHeight();
		while (height === this.height);
		this.setHeight(height);
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
