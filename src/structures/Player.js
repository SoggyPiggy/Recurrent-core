import { TickBase } from "./Bases";
class Player extends TickBase
{
	constructor(data = {})
	{
		super(data)
		this.name = 'Name'
	}

	toString = () => `${this.name} - ${this._id}`
}

export { Player }