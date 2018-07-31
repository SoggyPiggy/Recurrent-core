class PlayerAttributes
{
	constructor(player, data = {})
	{
		this.player = player;
		this.random = this.player.random;
		this.raw = {};
		this.generate(data);
	}

	get charm() { return this.raw.charm; }
	get constitution() { return this.raw.constitution; }
	get fortitude() { return this.raw.fortitude; }
	get fortuity() { return this.raw.fortuity; }
	get insight() { return this.raw.insight; }
	get might() { return this.raw.might; }
	get perception() { return this.raw.perception; }
	get proficiency() { return this.raw.proficiency; }
	get stamina() { return this.raw.stamina; }

	attributes()
	{
		return [
			'charm',				//	????? (Maybe help with reputation)
			'constitution',	//	More Health
			'fortitude',		//	Damage Resistance
			'fortuity',	 		//	Better Luck/Chances
			'insight',			//	More XP
			'might',				//	Stronger Attacks
			'perception',		//	Accuracy
			'proficiency',		//	Faster Tick Rate
			'stamina',			//	Longer in the Field
		]
	}

	generate(data = {})
	{
		let attributes = this.attributes();
		let total = attributes.length * 100
		let used = 0;
		for (let attribute of attributes)
		{
			if (typeof data[attribute] === 'undefined') this.raw[attribute] = 0;
			else
			{
				this.raw[attribute] = data[attribute];
				used += data[attribute];
				attributes = attributes.filter(a => a !== attribute);
			}
		}
		while ((attributes.length >= 1) && (used < total))
		{
			let selected = this.random.pick(attributes);
			if (this.raw[selected] >= 150) continue;
			let adjust = 15 + this.random.integer(-7, 7);
			this.raw[selected] += adjust;
			used += adjust;
		}
	}

	compress()
	{
		let data = {};
		let attributes = this.attributes();
		for (let attribute of attributes)
		{
			data[attribute] = this.raw[attribute];
		}
		return data;
	}
}

module.exports = { PlayerAttributes };