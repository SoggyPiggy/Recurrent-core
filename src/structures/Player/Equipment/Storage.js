class EquipmentStorage
{
	constructor(equipment, data = {})
	{
		this.equipment = equipment;
		this.items = typeof data.items !== 'undefined' ? data.items : [];
	}
}

module.exports = { EquipmentStorage };
