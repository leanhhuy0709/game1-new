import Renderable from '../renderer/Renderable'
import Canvas from '../renderer/canvas/Canvas'
import Coord from './Coord'

class Text extends Renderable {
    private content: string
    private font: string
    private align: CanvasTextAlign
    private baseline: CanvasTextBaseline
    private color: string
    private coord: Coord

    public constructor(
        content = '',
        x = 100,
        y = 100,
        font = '30px Cambria',
        align: CanvasTextAlign,
        color = 'black',
        baseline: CanvasTextBaseline = 'alphabetic'
    ) {
        super()
        this.coord = new Coord(x, y)
        this.content = content
        this.font = font
        this.align = align
        this.color = color
        this.baseline = baseline
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
        if (Canvas.ctx) {
            Canvas.ctx.fillStyle = this.color
            Canvas.ctx.font = this.font
            Canvas.ctx.textAlign = this.align
            Canvas.ctx.textBaseline = this.baseline
            Canvas.ctx.fillText(this.content, this.coord.getX(), this.coord.getY())
        }
    }

    public setCoord(x: number, y: number): void {
        this.coord.setCoord(x, y)
    }

    public getCoord(): Coord {
        return this.coord
    }
}

export default Text
