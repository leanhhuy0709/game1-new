import Random from '../engine/math/Random'
import Circle from '../engine/shape/Circle'
import Decor from './Decor'

export default class Stone extends Decor {
    public constructor(x: number, y: number, r: number) {
        super(new Circle(x, y, r, 'Stone'), [], 1, Random.getIntNumber(-5, 5) / 10)
    }

    public reset(x: number): void {
        this.getShape().getCoord().setCoord(x, 330)
        console.log(this.getShape().getCoord().getX())
        const cir = this.getShape() as Circle
        cir.setRadius(20)

        this.moveSpeed = Random.getIntNumber(-5, 5) / 10
        //console.log(this.getShape())
    }

    public render(): void {
        super.render()
    }
}
