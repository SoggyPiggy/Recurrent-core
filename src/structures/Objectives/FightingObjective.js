const { Objective } = require('./../Objective');

class FightingObjective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
	}

	generateInfo()
	{
		let data = {};
		data.title = 'Fighting Objective';
		data.description = 'You have to fight in order to live';
		return data;
	}
}

module.exports = { FightingObjective };