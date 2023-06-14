import Obstacle from './Obstacle'
import { FLYDINO_1, FLYDINO_2, FLYDINO_3 } from './const'

export default class FlyDino extends Obstacle {
    public constructor(delay: number, x = 0, moveSpeed = 4) {
        super([FLYDINO_1, FLYDINO_2, FLYDINO_3], delay, x)
        this.reset(x, moveSpeed)
    }
    public reset(x: number, moveSpeed = 4) {
        this.coord.setX(x)
        const arr = [265, 200, 130]
        this.coord.setY(arr[Math.floor(Math.random() * 3)])
        this.setSize(90, 80)
        this.moveSpeed = moveSpeed
    }
}
