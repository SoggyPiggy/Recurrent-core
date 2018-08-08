class PlayerLuck
{
	constructor(player, data = {})
	{
		// TODO: Make better.
		super(data);
		this.player = player;
		this.rolls = typeof data.rolls !== 'undefined' ? data.rolls : [];
		this.rollsCheck();
	}

	get random() { return this.player.random; }

	roll()
	{
		let roll = this.rolls.pop();
		this.rollsCheck();
		return roll === 1;
	}

	rollsCheck()
	{
		if (this.rolls.length <= 0)
		{
			let fails = Array(30).fill(0);
			let passes = Array(this.player.fortuity * 2 + 15).fill(1);
			let rolls = this.shuffle([].concat(fails).concat(passes));
			this.rolls.concat(rolls)
		}
	}

	shuffle(array)
	{
		let m = array.length, t, i;
		while (m)
		{
			i = this.random.integer(0, m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
		return array;
	}

	compress()
	{
		let data = {};
		data.rolls = this.rolls;
		return data;
	}
}

module.exports = { PlayerLuck };