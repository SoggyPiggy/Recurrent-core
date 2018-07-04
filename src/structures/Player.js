const { Actor } = require('./Actor');

class Player extends Actor
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
	}

	generateName()
	{
		let names = ['Bob', 'Jim', 'Rob', 'Tim', 'Tom', 'Han', 'Zac'];
		return this.random.pick(names);
	}

	toString() {return `${this.name} - ${this._id}`;}
}

module.exports = { Player }