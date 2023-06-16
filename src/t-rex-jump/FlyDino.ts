import Sprite from '../engine/component/Sprite'
import Movement from '../engine/component/physics/Movement'
import Random from '../engine/math/Random'
import { DEPTH } from '../types/depth'
import Obstacle from './Obstacle'
import { FLYDINO_1, FLYDINO_2, FLYDINO_3 } from './const'

export default class FlyDino extends Obstacle {
    public constructor(x: number) {
        super(x, 0, 0, 0)
        this.addComponent(new Sprite(this, [FLYDINO_1, FLYDINO_2, FLYDINO_3], DEPTH.OBJECT_MEDIUM))
        this.addComponent(new Movement(this, 0, 0, 0))
        this.reset(x)
    }
    public reset(x: number, moveSpeed = 0.5) {
        this.setX(x)
        const arr = [170, 130, 100]
        this.setY(arr[Random.getIntNumber(0, arr.length)])

        this.setWidth(90)
        this.setHeight(80)

        const tmp = this.getComponent<Movement>(Movement)
        if (tmp.length > 0) {
            tmp[0].setVelocity(moveSpeed, -1, 0)
        }
    }
}
