class ActorEquipment
{
	constructor(actor, data = {})
	{
		this.actor = actor;
		this.random = this.actor.random;
	}
}

module.exports = { ActorEquipment }