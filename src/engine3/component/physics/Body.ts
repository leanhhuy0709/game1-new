import GameObject from '../../game-objects/GameObject'
import Movement from './Movement'
import Force, { GRAVITY, MASS } from './force/Force'
import ForceVector from './force/ForceVector'

//Body can be affected by many forces
export default class Body extends Movement {
    private forces: Force[]
    private acceleration: ForceVector

    public constructor(obj: GameObject, velocity: number, x: number, y: number) {
        super(obj, velocity, x, y)
        this.forces = [GRAVITY]
        this.acceleration = new ForceVector(0, 0, 0)
        this.calculateAcceleration()
    }

    public addForce(force: Force): void {
        this.forces.push(force)
        this.calculateAcceleration()
    }

    public calculateAcceleration() {
        const totalForce = Force.calculateTotalForce(this.forces)
        this.acceleration.setMagnitude(totalForce.getForceVector().getMagnitude() / MASS)
        this.acceleration.setDirection(
            totalForce.getForceVector().getDirection().getX(),
            totalForce.getForceVector().getDirection().getY()
        )

        this.forces = [totalForce]
    }

    public update(deltaTime: number): void {
        const vX = this.velocity.getMagnitudeX()
        const vY = this.velocity.getMagnitudeY()

        const newVX = vX + this.acceleration.getMagnitudeX()
        const newVY = vY + this.acceleration.getMagnitudeY()

        const averageVX = (vX + newVX) / 2
        const averageVY = (vY + newVY) / 2

        const currX = this.parent.getX(),
            currY = this.parent.getY()

        const newX = currX + averageVX * deltaTime,
            newY = currY + averageVY * deltaTime

        this.parent.setX(newX)
        this.parent.setY(newY)

        this.velocity.setMagnitude(Math.sqrt(newVX ** 2 + newVY ** 2))
        this.velocity.setDirection(newVX, newVY)
    }

    public getAcceleration(): ForceVector {
        return this.acceleration
    }

    public setAcceleration(a: number, x: number, y: number): void {
        this.acceleration.setMagnitude(a)
        this.acceleration.setDirection(x, y)
    }
}
