// const NeDB = require('nedb');
// const path = require('path');
// const crypto = require('crypto');

// const pass = 'recurrent';

class Database
{
	// constructor(...args)
	// {
	// 	this.db = new NeDB({
	// 		filename: args.length < 1 ? undefined : path.join(...args, 'recurrent.save'),
	// 		autoload: true,
	// 		// afterSerialization: (data) =>
	// 		// {
	// 		// 	const cipher = crypto.createCipher('aes256', pass);
	// 		// 	return cipher.update(JSON.stringify(data), 'utf8', 'hex') + cipher.final('hex');
	// 		// },
	// 		// beforeDeserialization: (data) =>
	// 		// {
	// 		// 	const decipher = crypto.createDecipher('aes256', pass);
	// 		// 	return JSON.parse(decipher.update(data, 'hex', 'utf8') + decipher.final('utf8'));
	// 		// },
	// 	});
	// }

	// fetchGame(fallback)
	// {
	// 	return this.fetch('game', fallback);
	// }

	// saveGame(data)
	// {
	// 	this.save('game', data);
	// }

	// fetchQuest(id, fallback)
	// {
	// 	return this;
	// }

	// saveQuest(data)
	// {
	// 	this.save(`quest.${data.id}`, data);
	// }

	// fetchChapter(id, fallback)
	// {

	// }

	// saveChapter(data)
	// {
	// 	this.save(`chapter.${data.id}`, data);
	// }

	// save(_id, data)
	// {
	// 	this.db.update({ _id }, { _id, data }, { upsert: true });
	// }

	// fetch(_id, fallback)
	// {
	// 	return new Promise((resolve) =>
	// 	{
	// 		this.db.findOne({ _id }, (error, document) =>
	// 		{
	// 			if (error) resolve(fallback);
	// 			else resolve(document);
	// 		});
	// 	});
	// }
}

module.exports = { Database };
