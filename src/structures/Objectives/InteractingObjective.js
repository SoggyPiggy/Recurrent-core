const { Objective } = require('../Objective');

class _Objective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = 'interact';
	}
}

module.exports = { _Objective };
