import GameObject from '../../game-objects/GameObject'
import Component from '../Component'
import ForceVector from './force/ForceVector'

//Object which has Movement can move
export default class Movement extends Component {
    protected velocity: ForceVector

    public constructor(obj: GameObject, velocity = 0, x = 0, y = 0) {
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

    public addVeloctity(v: number, x: number, y: number): void {
        const vX = this.velocity.getMagnitudeX() + v * x
        const vY = this.velocity.getMagnitudeY() + v * y
        const d = Math.sqrt(vX ** 2 + vY ** 2 )
        if (d == 0) {
            this.velocity.setMagnitude(0)
            this.velocity.setDirection(0, 0)
        } else {
            this.velocity.setDirection(vX / d, vY / d)
            this.velocity.setMagnitude(d)
        }
    }
}
