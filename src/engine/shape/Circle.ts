import Canvas from '../renderer/canvas/Canvas'
import Shape from './Shape'

export default class Circle extends Shape {
    private radius: number

    public constructor(x: number, y: number, radius: number, tag = '') {
        super(x, y, tag)
        this.radius = radius
    }

    public getRadius(): number {
        return this.radius
    }

    public setRadius(radius: number): void {
        this.radius = radius
    }

    public render(): void {
        super.render()
        if (Canvas.ctx) {
            if (this.tag) {
                Canvas.ctx.fillStyle = 'black'
                Canvas.ctx.font = '15px Cambria'
                Canvas.ctx.textAlign = 'start'
                Canvas.ctx.fillText(
                    this.tag,
                    this.coord.getX() - this.radius,
                    this.coord.getY() - this.radius - 1
                )
            }

            Canvas.ctx.beginPath()
            Canvas.ctx.arc(this.coord.getX(), this.coord.getY(), this.radius, 0, 2 * Math.PI)
            Canvas.ctx.stroke()
            Canvas.ctx.closePath()
        }
    }

    public getHighestY(): number {
        return this.coord.getY() + this.radius
    }

    public setHighestY(y: number): void
    {
        this.coord.setY(y - this.radius)
    }
}
