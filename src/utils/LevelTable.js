const { IDMap } = require('./IDMap');

class LevelTable extends IDMap
{
	constructor()
	{
		super();
	}

	forLevel(level)
	{
		return Array.from(this.values()).filter(v => level >= v.minLevel && level <= v.maxLevel);
	}
}