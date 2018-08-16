const { Base } = require('./../../Bases');
const { Equipment } = require('./../../Equipment');

class GearSlot extends Base
{
	constructor(gear, data = {})
	{
		super();
		this.gear = gear;
		this.equipment = typeof data.equipment !== 'undefined' ? new Equipment(data.equipment) : Equipment.empty;
	}

	get player()
	{
		return this.gear.player;
	}

	get charm()
	{
		return this.equipment.charm;
	}

	get constitution()
	{
		return this.equipment.constitution;
	}

	get fortitude()
	{
		return this.equipment.fortitude;
	}

	get fortuity()
	{
		return this.equipment.fortuity;
	}

	get insight()
	{
		return this.equipment.insight;
	}

	get might()
	{
		return this.equipment.might;
	}

	get perception()
	{
		return this.equipment.perception;
	}

	get proficiency()
	{
		return this.equipment.proficiency;
	}

	get stamina()
	{
		return this.equipment.stamina;
	}

	equip(equipment = Equipment.empty())
	{
		const old = this.equipment;
		this.equipment = equipment;
		if (!old.empty) this.gear.storage.add(old);
	}

	toJSON()
	{
		const data = super.toJSON();
		data.equipment = this.equipment.toJSON();
		return data;
	}
}

module.exports = { GearSlot };
