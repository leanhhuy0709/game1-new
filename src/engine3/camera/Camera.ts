import Coord from '../component/Coord'
import ForceVector from '../component/physics/force/ForceVector'

export default class Camera {
    private position: Coord
    private velocity: ForceVector

    public constructor(speed = 0, x = 1, y = 0) {
        this.position = new Coord(0, 0)
        this.velocity = new ForceVector(speed, x, y)
    }

    public update(deltaTime: number): void {
        this.position.setCoord(
            this.position.getX() + deltaTime * this.velocity.getMagnitudeX(),
            this.position.getY() + deltaTime * this.velocity.getMagnitudeY()
        )
    }

    public getSpeed(): number {
        return this.velocity.getMagnitude()
    }

    public getX(): number {
        return this.position.getX()
    }

    public getY(): number {
        return this.position.getY()
    }
}
