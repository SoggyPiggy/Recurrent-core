const { Base } = require('./../../Bases');
const { Equipment } = require('./../../Equipment');

class GearSlot extends Base
{
	constructor(gear, data = {})
	{
		super();
		this.gear = gear;
		this.equipment = new Equipment(data.equipment);
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
}

module.exports = { GearSlot };
