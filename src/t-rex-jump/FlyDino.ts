import Random from '../engine/math/Random'
import Rectangle from '../engine/shape/Rectangle'
import Obstacle from './Obstacle'
import { FLYDINO_1, FLYDINO_2, FLYDINO_3 } from './const'

export default class FlyDino extends Obstacle {
    public constructor(delay: number, x = 0) {
        const arr = [170, 130, 100]
        super(new Rectangle(x, arr[Random.getIntNumber(0, arr.length)], 90, 80, 'FlyDino'), [FLYDINO_1, FLYDINO_2, FLYDINO_3], delay)
        this.reset(x)
    }
    public reset(x: number, moveSpeed = 0.5) {
        this.getShape().getCoord().setX(x)
        const arr = [170, 130, 100]
        this.getShape().getCoord().setY(arr[Random.getIntNumber(0, arr.length)])
        this.moveSpeed = moveSpeed
    }
}
