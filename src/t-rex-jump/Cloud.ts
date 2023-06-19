import Picture from '../engine/component/Picture'
import Movement from '../engine/component/physics/Movement'
import Random from '../engine/math/Random'
import { DEPTH } from './depth'
import Decor from './Decor'
import { CLOUD } from './const'

export default class Cloud extends Decor {
    public constructor(x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
        //super(new Rectangle(x, y, w, h, 'Cloud'), [CLOUD], 1, Random.getIntNumber(-5, 5) / 10)
        this.addComponent(new Picture(this, CLOUD, DEPTH.OBJECT_LOW))
        this.addComponent(new Movement(this, 0, 0, 0))
        this.reset(x)
    }

    public reset(x: number): void {
        this.setX(x)
        this.setY(Random.getIntNumber(0, 140))
        this.setWidth(90)
        this.setHeight(80)

        const tmp = this.getComponent<Movement>(Movement)
        if (tmp.length > 0) {
            tmp[0].setVelocity(Random.getIntNumber(-5, 5) / 10, -1, 0)
        }
    }
}
