import Renderer from '../engine/Renderer'
import Coord from './Coord'
import Renderable from './Renderable'

class Text extends Renderable {
    private content: string
    private font: string
    private align: CanvasTextAlign
    private color: string
    private coord: Coord

    public constructor(
        content = '',
        x = 100,
        y = 100,
        font = '30px Cambria',
        align: CanvasTextAlign,
        color = 'black'
    ) {
        super()
        this.coord = new Coord(x, y)
        this.content = content
        this.font = font
        this.align = align
        this.color = color
    }

    public getContent(): string {
        return this.content
    }

    public getFont(): string {
        return this.font
    }

    public getAlign(): CanvasTextAlign {
        return this.align
    }

    public setContent(content: string): void {
        this.content = content
    }

    public setFont(font: string): void {
        this.font = font
    }

    public setAlign(align: CanvasTextAlign): void {
        this.align = align
    }

    public render(): void {
        if (Renderer.ctx) {
            Renderer.ctx.fillStyle = this.color
            Renderer.ctx.font = this.font
            Renderer.ctx.textAlign = this.align
            Renderer.ctx.fillText(this.content, this.coord.getX(), this.coord.getY())
        }
    }

    public setCoord(x: number, y: number):void
    {
        this.coord.setCoord(x, y)
    }

    public getCoord(): Coord 
    {
        return this.coord
    }
}

export default Text
