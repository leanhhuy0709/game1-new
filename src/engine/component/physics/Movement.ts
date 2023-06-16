import GameObject from '../../game-objects/GameObject'
import Component from '../Component'
import ForceVector from './force/ForceVector'

//Body can be affected by many forces
export default class Movement extends Component {
    protected velocity: ForceVector

    public constructor(obj: GameObject, velocity: number, x: number, y: number) {
        super(obj)
        this.velocity = new ForceVector(velocity, x, y)
    }

    public update(deltaTime: number): void {
        const vX = this.velocity.getMagnitudeX()
        const vY = this.velocity.getMagnitudeY()

        const currX = this.parent.getX(),
            currY = this.parent.getY()

        const newX = currX + vX * deltaTime,
            newY = currY + vY * deltaTime

        this.parent.setX(newX)
        this.parent.setY(newY)
    }

    public getVelocity(): ForceVector {
        return this.velocity
    }

    public setVelocity(v: number, x: number, y: number): void {
        this.velocity.setMagnitude(v)
        this.velocity.setDirection(x, y)
    }
}
