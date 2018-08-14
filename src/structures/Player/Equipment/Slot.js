class EquipmentSlot
{
	constructor(equipment, data = {})
	{
		this.equipment = equipment;
		this.item = typeof data.item !== 'undefined' ? data.item : null;
	}

	get player()
	{
		return this.equipment.player;
	}

	get charm()
	{
		return this.item !== null ? this.item.charm : 0;
	}

	get constitution()
	{
		return this.item !== null ? this.item.constitution : 0;
	}

	get fortitude()
	{
		return this.item !== null ? this.item.fortitude : 0;
	}

	get fortuity()
	{
		return this.item !== null ? this.item.fortuity : 0;
	}

	get insight()
	{
		return this.item !== null ? this.item.insight : 0;
	}

	get might()
	{
		return this.item !== null ? this.item.might : 0;
	}

	get perception()
	{
		return this.item !== null ? this.item.perception : 0;
	}

	get proficiency()
	{
		return this.item !== null ? this.item.proficiency : 0;
	}

	get stamina()
	{
		return this.item !== null ? this.item.stamina : 0;
	}
}

module.exports = { EquipmentSlot };
