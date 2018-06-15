const { Quest } = require('./../structures/Quest');

class QuestManager extends Array
{
	constructor(data)
	{
		if (!Array.isArray(data)) data = [];
		for (let i = 0; i < data.length; i++)
		{
			data[i] = new Quest(data[i]);
		}
		if (!data.length) data.unshift(new Quest());
		super(...data);
	}

	get quest() {return this[0]}

	newQuest(data)
	{
		this.unshift(new Quest(data));
		return this;
	}
}

module.exports = { QuestManager }