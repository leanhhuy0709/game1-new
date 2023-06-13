import Renderable from '../component/Renderable'

class Renderer {
    public static canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game')
    public static ctx: CanvasRenderingContext2D | null = Renderer.canvas.getContext('2d')
    private static renders: Renderable[] = []
    private static depths: number[] = []

    public static addToQueue(re: Renderable, depth: number) {
        Renderer.renders.push(re)
        Renderer.depths.push(depth)

        for (let i = Renderer.renders.length - 1; i > 0; i--) {
            if (Renderer.depths[i] < Renderer.depths[i - 1]) {
                const temp = Renderer.renders[i]
                Renderer.renders[i] = Renderer.renders[i - 1]
                Renderer.renders[i - 1] = temp
            } else break
        }
    }

    public static drawAll() {
        for (let i = 0; i < Renderer.renders.length; i++) {
            Renderer.renders[i].render()
        }
        Renderer.renders.length = 0
        Renderer.depths.length = 0
    }
}

export default Renderer
