import Canvas from './renderer/canvas/Canvas'

class Game {
    public constructor() {
        console.log('Game Init')
        Canvas.init('game', 200, 200)
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

const g = new Game()
g.start()

//export default Game

/*
<body style="width: 100%; display: flex; justify-content: center; align-items: center;">
    <canvas tabindex='1' id="game"></canvas>
  </body>
*/
