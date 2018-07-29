class LevelTable extends Array
{
	constructor()
	{
		super();
	}

	addDrop(min, max, item)
	{
		this.push({min, max, item});
	}

	getItems(level)
	{
		let data = [];
		for (let item of this)
		{
			if (level >= item.min && level <= item.max) data.push(item.item);
		}
		return data;
	}

	filterItems(level)
	{
		return this.filter(item => level >= item.min && level <= item.max);
	}
}