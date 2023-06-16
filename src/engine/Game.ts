import Canvas from './renderer/canvas/Canvas'

export default class Game {
    public constructor(gameWidth: number, gameHeight: number) {
        console.log('Game Init')
        Canvas.init('game', gameWidth, gameHeight)
    }

    public update(_lastTime: number) {
        const currTime = Date.now()
        requestAnimationFrame(() => this.update(currTime))
    }

    public start() {
        requestAnimationFrame(() => this.update(Date.now()))
    }
}
