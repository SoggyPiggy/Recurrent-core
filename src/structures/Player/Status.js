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
		return 145 + (this.player.constitution);
	}

	get maxStamina()
	{
		return 20 + (this.player.diligence);
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

	recover()
	{
		if (!this.fullHealth && !this.fatigued)
		{
			const energy = this.stamina >= 5 ? 5 : this.stamina;
			const health = this.maxHealth * (0.05 * (energy / 5));
			this.loseStamina(energy);
			this.gainHealth(health);
			this.fatiguedCheck();
		}
	}

	respite()
	{
		const energy = this.maxStamina * 0.05;
		this.gainStamina(energy);
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
		this.health -= damage;
		this.deathCheck();
	}

	loseStamina(energy)
	{
		if (this.fatigued) return;
		this.stamina -= energy;
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
