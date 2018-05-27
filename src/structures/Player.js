const { TickBase } = require("./Bases");
class Player extends TickBase
{
	constructor(data = {})
	{
		super(data);
		this.name = 'Name';
	}

	toString() {return `${this.name} - ${this._id}`;}
}

module.exports = { Player }