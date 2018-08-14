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

	toJSON()
	{
		const data = {};
		data.head = this.head.toJSON();
		data.body = this.body.toJSON();
		data.legs = this.legs.toJSON();
		data.hands = this.hands.toJSON();
		data.waist = this.waist.toJSON();
		data.storage = this.storage.toJSON();
		return data;
	}
}

module.exports = { PlayerEquipment };
