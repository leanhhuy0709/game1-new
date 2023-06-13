import Renderer from '../engine/Renderer'

class Text {
    private content: string
    private font: string
    private align: CanvasTextAlign
    private color: string

    public constructor(
        content = '',
        font = '30px Cambria',
        align: CanvasTextAlign,
        color = 'black'
    ) {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public render(x: number, y: number, depth: number): void {
        if (Renderer.ctx) {
            Renderer.ctx.fillStyle = this.color
            Renderer.ctx.font = this.font
            Renderer.ctx.textAlign = this.align
            Renderer.ctx.fillText(this.content, x, y)
            //Renderer.ctx.strokeText(this.content, x, y)
        }
    }
}

export default Text
