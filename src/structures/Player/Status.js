const { Base } = require('./../Bases');

class PlayerStatus extends Base
{
	constructor(player, data = {})
	{
		super();
		this.player = player;
		this.health = typeof data.health !== 'undefined' ? data.health : this.maxHealth;
		this.stamina = typeof data.stamina !== 'undefined' ? data.stamina : this.maxStamina;
	}

	get maxHealth()
	{
		return 725 + (this.player.constitution * 5);
	}

	get maxStamina()
	{
		return 100 + (this.player.determination * 5);
	}

	get fullHealth()
	{
		return this.health === this.maxHealth;
	}

	get fullStamina()
	{
		return this.stamina === this.maxStamina;
	}

	get dead()
	{
		return this.health <= 0;
	}

	get fatigued()
	{
		return this.stamina <= 0;
	}

	get healthy()
	{
		return this.health >= (this.maxHealth / 3) * 2;
	}

	get rested()
	{
		return this.stamina >= (this.maxStamina / 3) * 2;
	}

	gainHealth(health = this.maxHealth)
	{
		if (Math.round(health) + this.health > this.maxHealth) this.health = this.maxHealth;
		else this.health += Math.round(health);
	}

	gainStamina(energy = this.maxStamina)
	{
		if (Math.round(energy) + this.stamina > this.maxStamina) this.stamina = this.maxStamina;
		else this.stamina += Math.round(energy);
	}

	loseHealth(damage)
	{
		if (this.dead) return;
		this.health -= Math.round(damage);
		this.deathCheck();
	}

	loseStamina(energy)
	{
		if (this.fatigued) return;
		this.stamina -= Math.round(energy);
		this.fatiguedCheck();
	}

	deathCheck()
	{
		if (!this.dead) return false;
		this.player.emit('died');
		return true;
	}

	fatiguedCheck()
	{
		if (!this.fatigued) return false;
		this.player.emit('fatigued');
		return true;
	}

	reset()
	{
		this.health = this.maxHealth;
		this.stamina = this.maxStamina;
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'health',
			'stamina',
		];
	}
}

module.exports = { PlayerStatus };
