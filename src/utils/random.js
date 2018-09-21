const RandomJs = require('random-js');

const random = new RandomJs(RandomJs.engines.browserCrypto);

module.exports = { RandomJs, random };
