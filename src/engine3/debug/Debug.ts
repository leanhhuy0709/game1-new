import { DINOSAUR_1, DINOSAUR_2, DINOSAUR_3 } from '../../t-rex-jump/const'
import Game from '../Game'
import Picture from '../component/Picture'
import Sprite from '../component/Sprite'
import GameObject from '../game-objects/GameObject'
import Loader from '../loader/Loader'

export default class Debug extends Game {
    o1: GameObject
    public constructor() {
        super(700, 400)
        Loader.loadAllImages([DINOSAUR_1, DINOSAUR_2, DINOSAUR_3])
        this.o1 = new GameObject(0, 0, 100, 100)
        this.o1.addComponent(new Picture(this.o1, DINOSAUR_1))
        this.o1.addComponent(new Sprite(this.o1, [DINOSAUR_2, DINOSAUR_3], 10))
    }

    public update(lastTime: number): void {
        let currTime = Date.now()
        const deltaTime = currTime - lastTime

        this.o1.update(deltaTime)
        this.o1.render()

        currTime = Date.now()
        super.update(currTime)
    }
}

const g = new Debug()

g.update(Date.now())
