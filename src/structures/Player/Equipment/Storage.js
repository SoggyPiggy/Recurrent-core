const { Base } = require('./../../Bases');

class EquipmentStorage extends Base
{
	constructor(equipment, data = {})
	{
		super();
		this.equipment = equipment;
		this.items = typeof data.items !== 'undefined' ? data.items : [];
	}
}

module.exports = { EquipmentStorage };
