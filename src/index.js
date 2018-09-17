const { Game } = require('./structures/Game');
const { Database } = require('./structures/Database');

const { Attributes } = require('./structures/Attributes');
const {
	Base,
	EventBase,
	ArrayBase,
	ManagerBase,
	TickBase,
} = require('./structures/Bases');
const { Chapter } = require('./structures/Chapter');
const { Coordinates } = require('./structures/Coordinates');
const { Equipment } = require('./structures/Equipment');
const { Experience } = require('./structures/Experience');
const { Item } = require('./structures/Item');
const { Objective } = require('./structures/Objective');
const { Player } = require('./structures/Player');
const { Quest } = require('./structures/Quest');
const { Storage } = require('./structures/Storage');

module.exports = {
	Game,
	Database,

	Base,
	EventBase,
	ArrayBase,
	ManagerBase,
	TickBase,

	Attributes,
	Chapter,
	Coordinates,
	Equipment,
	Experience,
	Item,
	Objective,
	Player,
	Quest,
	Storage,
};
