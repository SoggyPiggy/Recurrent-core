const { Objective } = require('../Objective');

class _Objective extends Objective
{
	constructor(chapter, data)
	{
		super(chapter, data);
		this.type = '_';
	}
}

module.exports = { _Objective };
