const { Base } = require('./../Bases');

const races = {
	human:
	{
		race: 'Human',
		names: ['Frut', 'Brar', 'Crilk', 'Dhak', 'Bhob', 'Thulga', 'Virthi', 'Amgai', 'Mirta', 'Feto'],
	},
	orc:
	{
		race: 'Orc',
		names: ['Xurek', 'Meakgu', 'Mug', 'Varbu', 'Dakgu', 'Shagar', 'Bum', 'Murob', 'Shazgob', 'Badbog'],
	},
};

class PlayerInformation extends Base
{
	constructor(player, data = {})
	{
		super();
		this.player = player;
		this.custom = typeof data.custom !== 'undefined' ? data.custom : false;
		this.race = typeof data.race !== 'undefined' ? data.race : this.randomRace();
		this.name = typeof data.name !== 'undefined' ? data.name : this.randomName();
		this.raceName = races[this.race].race;
	}

	randomRace()
	{
		const raceIDs = Object.keys(races);
		return this.random.pick(raceIDs);
	}

	randomName()
	{
		return this.random.pick(races[this.race].names);
	}

	randomizeRace()
	{
		this.race = this.randomRace();
		if (!this.custom) this.randomizeName();
	}

	randomizeName()
	{
		this.name = this.randomName();
		this.custom = false;
	}

	setRace(race)
	{
		if (typeof races[race] === 'undefined') return;
		this.race = race;
		if (!this.custom) this.randomizeName();
	}

	setName(name)
	{
		this.name = name;
		this.custom = true;
	}

	toJSON()
	{
		const data = {};
		data.race = this.race;
		data.name = this.name;
		data.custom = this.custom;
		return data;
	}
}

module.exports = { PlayerInformation };
