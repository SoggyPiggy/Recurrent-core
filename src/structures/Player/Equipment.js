const { Base } = require('./../Bases');
const { EquipmentSlot } = require('./Equipment/Slot');
const { EquipmentStorage } = require('./Equipment/Storage');

class PlayerEquipment extends Base
{
	constructor(player, data = {})
	{
		super();
		this.player = player;
		this.head = new EquipmentSlot(this, data.head);
		this.body = new EquipmentSlot(this, data.body);
		this.legs = new EquipmentSlot(this, data.legs);
		this.hands = new EquipmentSlot(this, data.hands);
		this.waist = new EquipmentSlot(this, data.waist);
		this.storage = new EquipmentStorage(this, data.storage);
	}

	compress()
	{
		const data = {};
		data.head = this.head.compress();
		data.body = this.body.compress();
		data.legs = this.legs.compress();
		data.hands = this.hands.compress();
		data.waist = this.waist.compress();
		data.storage = this.storage.compress();
		return data;
	}
}

module.exports = { PlayerEquipment };
