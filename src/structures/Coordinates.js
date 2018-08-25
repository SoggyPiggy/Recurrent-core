const { Base } = require('./Bases');

function phix(phi)
{
	const angle = phi % 360;
	return angle < 0 ? 360 + angle : angle;
}

class Coordinates extends Base
{
	constructor(data = {})
	{
		super();
		this.phi = typeof data.phi !== 'undefined' ? data.phi : 0;
		this.rho = typeof data.rho !== 'undefined' ? data.rho : 0;
	}

	get degree()
	{
		return this.phi % 360;
	}

	get radian()
	{
		return this.phi * Math.PI / 180;
	}

	get distance()
	{
		return this.rho;
	}

	get x()
	{
		return this.rho * Math.cos(this.phi * (Math.PI / 180));
	}

	get y()
	{
		return this.rho * Math.sin(this.phi * (Math.PI / 180));
	}

	get coords()
	{
		return { x: this.x, y: this.y };
	}

	move(rho, phi)
	{
		if (typeof rho === 'object') return this.move(rho.rho, rho.phi);
		const psi = (phix(phi) - phix(this.phi)) * Math.PI / 180;
		const r = Math.sqrt((this.rho ** 2) + 2 * this.rho * rho * Math.cos(psi) + (rho ** 2));
		const p = Math.atan((this.rho + rho * Math.cos(psi)) / (rho * Math.sin(psi))) * 180 / Math.PI;
		this.rho = r;
		this.phi = p;
		return this;
	}

	set(rho, phi)
	{
		if (typeof rho === 'object') return this.set(rho.rho, rho.phi);
		this.rho = rho;
		this.phi = phi;
		return this;
	}

	getDistance(rho, phi)
	{
		if (typeof rho === 'object') return this.getDistance(rho.rho, rho.phi);
		return Math.sqrt((this.rho ** 2) + (rho ** 2) - 2 * this.rho * rho * Math.cos((phi - this.phi) * (Math.PI / 180))); // eslint-disable-line max-len
	}

	toString()
	{
		return `(${this.distance}, ${this.degree}°)`;
	}

	jsonKeys()
	{
		return [
			...super.jsonKeys(),
			'phi',
			'rho',
		];
	}
}

module.exports = { Coordinates };
