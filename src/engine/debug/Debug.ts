import Game from '../Game'
import Loader from '../resources/Loader'

export default class Debug extends Game {
    public constructor() {
        super(700, 400)
        Loader.loadAllImages([], [])
    }

    public update(lastTime: number): void {
        let currTime = Date.now()
        const deltaTime = currTime - lastTime

        if (Loader.isLoadComplete()) {
            //do some thing
        }

        currTime = Date.now()
        super.update(currTime)
    }
}

const g = new Debug()

g.update(Date.now())
