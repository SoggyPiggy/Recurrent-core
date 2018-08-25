const { Base } = require('../Bases');
const { GearSlot } = require('./Gear/Slot');
const { GearStorage } = require('./Gear/Storage');

class PlayerGear extends Base
{
	constructor(player, data = {})
	{
		super();
		this.player = player;
		this.head = new GearSlot(this, data.head);
		this.body = new GearSlot(this, data.body);
		this.legs = new GearSlot(this, data.legs);
		this.hands = new GearSlot(this, data.hands);
		this.waist = new GearSlot(this, data.waist);
		this.storage = new GearStorage(this, data.storage);
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'head',
			'body',
			'legs',
			'hands',
			'waist',
			'storage',
		];
	}
}

module.exports = { PlayerGear };
