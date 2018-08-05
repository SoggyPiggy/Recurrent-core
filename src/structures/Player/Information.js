let races = 
{
	human:
	{
		race: 'Human',
		names: ['Frut', 'Brar', 'Crilk', 'Dhak', 'Bhob', 'Thulga', 'Virthi', 'Amgai', 'Mirta', 'Feto']
	},
	orc:
	{
		race: 'Orc',
		names: ['Xurek', 'Meakgu', 'Mug', 'Varbu', 'Dakgu', 'Shagar', 'Bum', 'Murob', 'Shazgob', 'Badbog']
	}
}

class PlayerInformation
{
	constructor(player, data = {})
	{
		this.player = player;
		this.custom = typeof data.custom !== 'undefined' ? data.custom : false;
		this.race = typeof data.race !== 'undefined' ? data.race : this.randomRace();
		this.name = typeof data.name !== 'undefined' ? data.name : this.randomName();
		this.raceName = races[this.race].race;
	}

	get random() { return this.player.random; }

	randomRace()
	{
		let raceIDs = Object.keys(races);
		return this.random.pick(raceIDs);
	}

	randomName()
	{
		let names = races[this.race].names;
		return this.random.pick(names);
	}

	randomizeRace()
	{
		let race = this.randomRace();
		this.race = race;
		if (!this.custom) this.randomizeName();
	}

	randomizeName()
	{
		let name = this.randomName();
		this.name = name;
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

	compress()
	{
		let data = {};
		data.race = this.race;
		data.name = this.name;
		data.custom = this.custom;
		return data;
	}
}

module.exports = { PlayerInformation };