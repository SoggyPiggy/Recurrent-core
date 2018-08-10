module.exports = {
	"extends": "airbnb-base",
	"rules":
	{
		'brace-style': ['error', 'allman'],
		'indent': ['error', 'tab', {'SwitchCase': 1}],
		'no-tabs': 0,
		'linebreak-style': 0,
		'implicit-arrow-linebreak': 0,
		'class-methods-use-this': [1, { 'exceptMethods': ['getLevel', 'getXPTotal', 'bonusXP', 'drain', 'generateRewards', 'getXP'] }],
	}
};