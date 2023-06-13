import Coord from './Coord'
import Renderer from '../engine/Renderer'
import Size from './Size'
import Text from './Text'

class Button {
    private text: Text
    private coord: Coord
    private size: Size
    private isHover: boolean

    public constructor(content: string, x = 0, y = 0, w = 0, h = 0) {
        this.text = new Text(content, `30px 'Montserrat', sans-serif`, 'center')
        this.coord = new Coord(x, y)
        this.size = new Size(w, h)
        this.isHover = false
    }

    public getText(): Text {
        return this.text
    }

    public getCoord(): Coord {
        return this.coord
    }

    public getSize(): Size {
        return this.size
    }

    public setContent(content: string): void {
        this.text.setContent(content)
    }

    public setCoord(x: number, y: number): void {
        this.coord.setX(x)
        this.coord.setY(y)
    }

    public setSize(w: number, h: number): void {
        this.size.setWidth(w)
        this.size.setHeight(h)
    }

    public render(): void {
        if (Renderer.ctx) {
            if (!this.isHover) {
                Renderer.ctx.save()
                Renderer.ctx.fillStyle = '#0d63fd'

                Renderer.ctx.beginPath()
                Renderer.ctx.roundRect(
                    this.coord.getX() - this.size.getWidth() / 2,
                    this.coord.getY() - this.size.getHeight() / 2,
                    this.size.getWidth(),
                    this.size.getHeight(),
                    10
                )
                Renderer.ctx.closePath()
                Renderer.ctx.fill()
                Renderer.ctx.stroke()

                Renderer.ctx.fillStyle = 'white'
                Renderer.ctx.font = this.text.getFont()
                Renderer.ctx.textAlign = this.text.getAlign()
                Renderer.ctx.textBaseline = 'middle'
                //Renderer.ctx.strokeText(this.text.getContent(), this.coord.getX(), this.coord.getY())
                Renderer.ctx.fillText(this.text.getContent(), this.coord.getX(), this.coord.getY())
                Renderer.ctx.restore()
            } else {
                Renderer.ctx.save()
                Renderer.ctx.fillStyle = 'white'

                Renderer.ctx.beginPath()
                Renderer.ctx.roundRect(
                    this.coord.getX() - this.size.getWidth() / 2,
                    this.coord.getY() - this.size.getHeight() / 2,
                    this.size.getWidth(),
                    this.size.getHeight(),
                    10
                )
                Renderer.ctx.closePath()
                Renderer.ctx.fill()
                Renderer.ctx.stroke()

                Renderer.ctx.fillStyle = '#0d63fd'
                Renderer.ctx.font = this.text.getFont()
                Renderer.ctx.textAlign = this.text.getAlign()
                Renderer.ctx.textBaseline = 'middle'
                //Renderer.ctx.strokeText(this.text.getContent(), this.coord.getX(), this.coord.getY())
                Renderer.ctx.fillText(this.text.getContent(), this.coord.getX(), this.coord.getY())
                Renderer.ctx.restore()
            }
        }
    }

    public isClicked(x: number, y: number): boolean {
        return (
            x >= this.coord.getX() - this.size.getWidth() / 2 &&
            x <= this.coord.getX() + this.size.getWidth() / 2 &&
            y >= this.coord.getY() - this.size.getHeight() / 2 &&
            y <= this.coord.getY() + this.size.getHeight() / 2
        )
    }

    public isHovered(x: number, y: number): boolean {
        this.isHover =
            x >= this.coord.getX() - this.size.getWidth() / 2 &&
            x <= this.coord.getX() + this.size.getWidth() / 2 &&
            y >= this.coord.getY() - this.size.getHeight() / 2 &&
            y <= this.coord.getY() + this.size.getHeight() / 2
        return this.isHover
    }
}

export default Button
