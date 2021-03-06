function parseID(id)
{
	if (typeof id === 'string') return id;
	if (typeof id === 'object') return id.id;
	return id;
}

class IDMap extends Map
{
	delete(key)
	{
		return super.delete(parseID(key));
	}

	get(key)
	{
		return super.get(parseID(key));
	}

	has(key)
	{
		return super.has(parseID(key));
	}

	set(key, value)
	{
		if (typeof value === 'undefined') return super.set(parseID(key), key);
		return super.set(parseID(key), value);
	}
}

module.exports = { IDMap };
