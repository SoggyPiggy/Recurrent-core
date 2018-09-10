const { Quest } = require('./../Quest');
const {
	InteractingObjective,
	TravelingObjective,
	RestingObjective,
	SearchingObjective,
	FightingObjective,
} = require('./../Objectives');

class SlayerQuest extends Quest
{
	constructor(chapter, data = {})
	{
		super(chapter, data);
		this.type = 'slayer';
	}

	generateObjectives()
	{
		const infoAssigner = `${this.random.pick(['drab', 'hobbled', 'beautiful', 'handsome', 'ugly', 'unsightly', 'rich', 'poor'])} ${this.random.pick(['old', 'young'])} ${this.random.pick(['man', 'women'])}`;
		const infoDirection = this.random.pick(['north', 'south', 'east', 'west']);
		const infoLocation = this.random.pick(['up ahead', 'down the road', `in the cave to the ${infoDirection}`, `in the farms to the ${infoDirection}`, 'in the woods']);
		const infoTargetUnknown = this.random.pick(['trouble', 'noises']);
		const fightCount = this.random.integer(2, 5);
		const objectives = [];

		const travelData = {
			title: 'Explore the area',
			description: 'Head out to explore the area',
		};
		objectives.push(new TravelingObjective(this, travelData));

		if (this.random.bool(!this.player.status.rested ? 1 : 0.3))
		{
			const restData = {
				title: 'Rest for a bit',
				description: 'Rest for a before heading into town',
			};
			objectives.push(new RestingObjective(this, restData));
		}

		const interactionData = {
			title: `Speak with the ${infoAssigner}`,
			description: `The ${infoAssigner} says there has been some ${infoTargetUnknown} ${infoLocation}.`,
		};
		objectives.push(new InteractingObjective(this, interactionData));

		const searchData = {
			title: `Seek the source of the ${infoTargetUnknown}`,
			description: `Search the area to find the ${infoTargetUnknown} the ${infoAssigner} was talking about`,
		};
		objectives.push(new SearchingObjective(this, searchData));

		for (let i = 0; i < fightCount; i += 1)
		{
			const infoTarget = `${this.random.pick(['feral', 'wild', 'murderous', 'aroused', 'brutal', 'deadly'])} ${this.random.pick(['badger', 'fox', 'bandit', 'chihuahua'])}`;
			const fightData = {
				title: `${this.random.pick(['Fight', 'Slay', 'Fight', 'Slay', 'Brawl', 'Duel'])} the ${infoTarget}`,
				description: `The ${infoTarget} has been wreaking havoc. Its time to put a stop to them.`,
			};
			objectives.push(new FightingObjective(this, fightData));
		}

		return objectives;
	}
}

module.exports = { SlayerQuest };
