const { Base } = require('../Bases');
const { Attributes } = require('./../Attributes');
const { Equipment } = require('./../Equipment');
const { GearStorage } = require('./Gear/Storage');

class PlayerGear extends Base
{
	constructor(player, data = {})
	{
		super();
		this.player = player;
		this.storage = new GearStorage(this, data.storage);

		PlayerGear.slots.forEach((slot) =>
		{
			this[`${slot}ID`] = typeof data[`${slot}ID`] !== 'undefined' ? data[`${slot}ID`] : null;

			if (this[`${slot}ID`] === null) this[`${slot}Reference`] = Equipment.empty();
			else
			{
				const equipment = this.storage.find(item => item.id === this[`${slot}ID`]);
				if (equipment) this[`${slot}Reference`] = equipment;
				else this[`${slot}Reference`] = Equipment.empty();
			}

			Object.defineProperty(this, slot, {
				get: () => this[`${slot}Reference`],
				set: (item) =>
				{
					if (item instanceof Equipment)
					{
						this[`${slot}ID`] = item.id;
						this[`${slot}Reference`] = item;
					}
					else
					{
						this[`${slot}ID`] = null;
						this[`${slot}Reference`] = Equipment.empty();
					}
				},
			});
		});
		Attributes.list.forEach((attribute) =>
		{
			Object.defineProperty(this, attribute, {
				get: () =>
					PlayerGear.slots.reduce((total, slot) => total + this[slot].attributes[attribute], 0),
			});
		});
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			...PlayerGear.slots.map(slot => `${slot}ID`),
			'storage',
		];
	}

	static get slots()
	{
		return [
			'head',
			'body',
			'legs',
			'feet',
			'hands',
			'waist',
		];
	}
}

module.exports = { PlayerGear };
