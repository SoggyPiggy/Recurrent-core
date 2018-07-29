const RandomJs = require('random-js');
const Random = new RandomJs(RandomJs.engines.browserCrypto);

function attributes(attributes, settings = {}, nulls = [])
{
	let data = {};
	settings.points = typeof settings.points !== 'undefined' ? settings.points : 100;
	settings.max = typeof settings.max !== 'undefined' ? settings.max : settings.points * 1.5;
	settings.chunk = typeof settings.chunk !== 'undefined' ? settings.chunk : settings.max * .15;
	settings.chip = typeof settings.chip !== 'undefined' ? settings.chip : settings.chunk / 2;
	let total = attributes.length * settings.points;
	let used = 0;
	for (let attribute of attributes) { data[attribute] = 0; }
	while (used < total)
	{
		let selected = Random.pick(attributes);
		if (data[selected] >= settings.max) continue;
		let adjust = settings.chunk + Random.real(-settings.chip, settings.chip);
		data[selected] += adjust;
		used += adjust;
	}
	for (let attribute of attributes) { data[attribute] = Math.round(data[attribute]); }
	return data;
}

module.exports = { attributes };