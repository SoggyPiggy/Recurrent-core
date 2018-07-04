const { Actor } = require('./Actor');

class Mob extends Actor
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
	}
}