const { Base } = require('../Bases');
const { Equipment } = require('./../Equipment');
const { GearStorage } = require('./Gear/Storage');

class PlayerGear extends Base
{
	constructor(player, data = {})
	{
		super();
		this.player = player;
		PlayerGear.slots.forEach((part) =>
		{
			this[`${part}ID`] = typeof data[`${part}ID`] !== 'undefined' ? data[`${part}ID`] : null;
		});
		this.storage = new GearStorage(this, data.storage);
		this.refreshReferences();
		this.setupGettersSetters();
	}

	setupGettersSetters()
	{
		PlayerGear.slots.forEach((part) =>
		{
			Object.defineProperty(this, part, {
				get: () => this[`${part}Reference`],
				set: (item) =>
				{
					if (item instanceof Equipment)
					{
						this[`${part}ID`] = item.id;
						this[`${part}Reference`] = item;
					}
					else
					{
						this[`${part}ID`] = null;
						this[`${part}Reference`] = Equipment.empty();
					}
				},
			});
		});
	}

	refreshReferences()
	{
		PlayerGear.slots.forEach((part) =>
		{
			const id = this[`${part}ID`];
			if (id !== null)
			{
				const equipment = this.storage.find(item => item.id === id);
				if (equipment)
				{
					this[`${part}Reference`] = equipment;
					return;
				}
			}
			this[`${part}Reference`] = Equipment.empty();
		});
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			...PlayerGear.slots.map(part => `${part}ID`),
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
