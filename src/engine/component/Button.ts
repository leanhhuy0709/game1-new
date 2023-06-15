import GameObject from '../game-objects/GameObject'
import Canvas from '../renderer/canvas/Canvas'
import Rectangle from '../shape/Rectangle'
import Text from './Text'

class Button extends GameObject {
    private text: Text
    private isHover: boolean

    public constructor(content: string, x: number, y: number, w: number, h: number) {
        super(new Rectangle(x, y, w, h))
        this.text = new Text(
            content,
            x + w / 2,
            y + h / 2,
            `30px 'Montserrat', sans-serif`,
            'center',
            'white',
            'middle'
        )
        this.isHover = false
    }

    public getText(): Text {
        return this.text
    }

    public setContent(content: string): void {
        this.text.setContent(content)
    }

    public render(): void {
        super.render()
        if (Canvas.ctx) {
            if (this.getShape() instanceof Rectangle) {
                const rect = this.getShape() as Rectangle
                Canvas.ctx.beginPath()
                Canvas.ctx.fillStyle = this.isHover ? '#ffffff' : '#0d63fd'
                Canvas.ctx.roundRect(
                    rect.getCoord().getX(),
                    rect.getCoord().getY(),
                    rect.getSize().getWidth(),
                    rect.getSize().getHeight(),
                    10
                )
                Canvas.ctx.closePath()
                Canvas.ctx.fill()
                this.text.setColor(this.isHover ? '#0d63fd' : '#ffffff')
                this.text.render()
            }
        }
    }

    public isClicked(x: number, y: number): boolean {
        return (
            x >= this.getShape().getCoord().getX() &&
            x <= this.getShape().getHighestX() &&
            y >= this.getShape().getCoord().getY() &&
            y <= this.getShape().getHighestY()
        )
    }

    public isHovered(x: number, y: number): boolean {
        this.isHover =
            x >= this.getShape().getCoord().getX() &&
            x <= this.getShape().getHighestX() &&
            y >= this.getShape().getCoord().getY() &&
            y <= this.getShape().getHighestY()
        return this.isHover
    }
}

export default Button
