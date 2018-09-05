const { EventEmitter } = require('events');

class SaveManager extends EventEmitter
{
	constructor(game)
	{
		super();
		this.game = game;
		this.lastSave = new Date();
		this.delay = 60000;
		this.interval = setInterval(() => this.save(false), this.delay);
	}

	save(force = true)
	{
		const time = new Date();
		if (force && (time - this.lastSave > this.delay))
		{
			/* Example
			const data = {};
			this.emit('save', data, 'chapter', 'chapter-id');
			*/
		}
	}
}

module.exports = { SaveManager };
