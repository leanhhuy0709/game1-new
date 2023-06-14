import Canvas from './renderer/canvas/Canvas'

export default class Game {
    public constructor(gameWidth: number, gameHeight: number) {
        console.log('Game Init')
        Canvas.init('game', gameWidth, gameHeight)
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

/*
<body style="width: 100%; display: flex; justify-content: center; align-items: center;">
    <canvas tabindex='1' id="game"></canvas>
  </body>
*/
