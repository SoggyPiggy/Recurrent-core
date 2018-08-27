const { Base } = require('./../../Bases');
const { Equipment } = require('./../../Equipment');

class GearSlot extends Base
{
	constructor(gear, data = {})
	{
		super();
		this.gear = gear;
		this.equipment = typeof data.equipment !== 'undefined' ? new Equipment(data.equipment) : Equipment.empty();
	}

	get player()
	{
		return this.gear.player;
	}

	get awarness()
	{
		return this.equipment.awarness;
	}

	get charm()
	{
		return this.equipment.charm;
	}

	get constitution()
	{
		return this.equipment.constitution;
	}

	get diligence()
	{
		return this.equipment.diligence;
	}

	get fortuity()
	{
		return this.equipment.fortuity;
	}

	get ingenuity()
	{
		return this.equipment.ingenuity;
	}

	get insight()
	{
		return this.equipment.insight;
	}

	get might()
	{
		return this.equipment.might;
	}

	get proficiency()
	{
		return this.equipment.proficiency;
	}

	equip(equipment = Equipment.empty())
	{
		const old = this.equipment;
		this.equipment = equipment;
		if (!old.empty) this.gear.storage.add(old);
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'equipment',
		];
	}
}

module.exports = { GearSlot };
