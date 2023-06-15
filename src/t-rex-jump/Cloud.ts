import Random from '../engine/math/Random'
import Rectangle from '../engine/shape/Rectangle'
import Decor from './Decor'
import { CLOUD } from './const'

export default class Cloud extends Decor {
    public constructor(x: number, y: number, w: number, h: number) {
        super(new Rectangle(x, y, w, h, 'Cloud'), [CLOUD], 1, Random.getIntNumber(-5, 5) / 10)
    }

    public reset(x: number): void {
        this.getShape().getCoord().setCoord(x, Random.getIntNumber(0, 140))
        console.log(this.getShape().getCoord().getX())
        const rect = this.getShape() as Rectangle
        rect.getSize().setSize(90, 80)
        this.moveSpeed = Random.getIntNumber(-5, 5) / 10
        //console.log(this.getShape())
    }

    public render(): void {
        super.render()
    }
}
