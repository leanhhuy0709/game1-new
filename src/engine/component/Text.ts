import GameObject from '../game-objects/GameObject'
import Canvas from '../renderer/canvas/Canvas'
import RenderComponent from './RenderComponent'

export default class Text extends RenderComponent {
    private content: string
    private font: string
    private align: CanvasTextAlign
    private baseline: CanvasTextBaseline
    private color: string

    public constructor(
        obj: GameObject,
        depth = 1,
        content = '',
        font = '30px Cambria',
        align: CanvasTextAlign = 'center',
        color = 'black',
        baseline: CanvasTextBaseline = 'alphabetic'
    ) {
        super(obj, depth)
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
            Canvas.ctx.fillText(this.content, this.parent.getX(), this.parent.getY())
        }
    }

    public setColor(color: string): void {
        this.color = color
    }

    public getColor(): string {
        return this.color
    }
}
