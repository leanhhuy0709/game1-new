import Obstacle from './Obstacle'
import { CACTUS } from './const'

export default class Cactus extends Obstacle {
    public constructor(delay: number, x = 0, moveSpeed = 0) {
        super(new Rectangle(x, 270, 60, 80, 'Cactus'), [CACTUS], delay)
        this.reset(x, moveSpeed)
    }
    public reset(x: number, moveSpeed = 0) {
        this.getShape().getCoord().setX(x)
        this.moveSpeed = moveSpeed
    }
}
