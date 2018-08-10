class PlayerLuck
{
	constructor(player, data = {})
	{
		// TODO: Make better.
		this.player = player;
		this.rolls = typeof data.rolls !== 'undefined' ? data.rolls : [];
		this.rollsCheck();
	}

	get random()
	{
		return this.player.random;
	}

	roll()
	{
		const roll = this.rolls.pop();
		this.rollsCheck();
		return roll === 1;
	}

	rollsCheck()
	{
		if (this.rolls.length <= 0)
		{
			const fails = Array(30).fill(0);
			const passes = Array(this.player.fortuity * 2 + 15).fill(1);
			const rolls = this.random.shuffle([].concat(fails).concat(passes));
			this.rolls.concat(rolls);
		}
	}

	compress()
	{
		const data = {};
		data.rolls = this.rolls;
		return data;
	}
}

module.exports = { PlayerLuck };
