import Renderer from './Renderer'

class Game {
    public constructor(canvasWidth: number, canvasHeight: number) {
        console.log('Game Init')
        Renderer.canvas.width = canvasWidth
        Renderer.canvas.height = canvasHeight
        Renderer.canvas.setAttribute('style', 'position: fixed')
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public update(lastTime: number) {
        const currTime = Date.now()
        requestAnimationFrame(() => this.update(currTime))
    }

    public start() {
        requestAnimationFrame(() => this.update(Date.now()))
    }
}

export default Game
