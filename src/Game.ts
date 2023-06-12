export default class Game {
    public constructor() {
        //
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public update(lastTime: number) {
        console.log('Hello')
        const currTime = Date.now()
        requestAnimationFrame(() => this.update(currTime))
    }

    public start() {
        requestAnimationFrame(() => this.update(Date.now()))
    }
}

const g = new Game()
g.update(Date.now())
