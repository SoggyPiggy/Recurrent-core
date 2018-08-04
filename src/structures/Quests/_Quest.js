const { Quest } = require('./../Quest');

class _Quest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.type = '_';
	}
}