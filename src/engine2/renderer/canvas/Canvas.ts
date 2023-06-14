export default class Canvas {
    public static canvas: HTMLCanvasElement
    public static ctx: CanvasRenderingContext2D | null

    public static init(canvasID: string, w: number, h: number) {
        Canvas.canvas = <HTMLCanvasElement>document.getElementById(canvasID)
        Canvas.ctx = Canvas.canvas.getContext('2d')
        Canvas.setSize(w, h)

        //Use to check canvas location

        if (Canvas.ctx) {
            Canvas.ctx.fillStyle = 'white'

            Canvas.ctx.beginPath()
            Canvas.ctx.roundRect(0, 0, w, h, 0)
            Canvas.ctx.closePath()
            Canvas.ctx.fill()
        }
    }

    public static setSize(w: number, h: number) {
        Canvas.canvas.width = w
        Canvas.canvas.height = h
    }
}
