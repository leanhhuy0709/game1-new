import Size from '../component/Size'
import Canvas from '../renderer/canvas/Canvas'
import Shape from './Shape'

export default class Rectangle extends Shape {
    private size: Size

    public constructor(x: number, y: number, w: number, h: number, tag = '') {
        super(x, y, tag)
        this.size = new Size(w, h)
    }

    public getSize(): Size {
        return this.size
    }

    public setSize(w: number, h: number): void {
        this.size.setWidth(w)
        this.size.setHeight(h)
    }

    public render(): void {
        if (Canvas.ctx) {
            if (this.tag) {
                Canvas.ctx.fillStyle = 'black'
                Canvas.ctx.font = '15px Cambria'
                Canvas.ctx.textAlign = 'start'
                Canvas.ctx.fillText(this.tag, this.coord.getX(), this.coord.getY() - 5)
            }
            Canvas.ctx.fillStyle = 'black'
            Canvas.ctx.beginPath()
            Canvas.ctx.roundRect(
                this.coord.getX(),
                this.coord.getY(),
                this.size.getWidth(),
                this.size.getHeight(),
                0
            )
            Canvas.ctx.closePath()
            Canvas.ctx.stroke()
        }
    }

    public getHighestY(): number {
        return this.coord.getY() + this.size.getHeight()
    }

    public setHighestY(y: number): void
    {
        this.coord.setY(y - this.size.getHeight())
    }
}
