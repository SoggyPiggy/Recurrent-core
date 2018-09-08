const { EventEmitter } = require('events');

class SaveManager extends EventEmitter
{
	constructor(game)
	{
		super();
		this.game = game;
		this.last = new Date().getTime();
		this.ticked = new Set();
		this.hashes = new Map();
	}

	save(force = true)
	{
		const time = new Date();
		if (force || (time - this.last > this.delay))
		{
			/* Example
			const data = {};
			this.emit('save', data, 'chapter', 'chapter-id');
			*/
		}
	}
}

module.exports = { SaveManager };
