import Game from '../Game'
import Button from '../component/Button'
import Body from '../game-objects/Body'
import GameObject from '../game-objects/GameObject'
import CollisionManager from '../physics/CollisionManager'
import Loader from '../resources/Loader'
import { DINOSAUR_1, DINOSAUR_2, START_BACKGROUND } from '../resources/file'
import Circle from '../shape/Circle'
import Rectangle from '../shape/Rectangle'
import Background from '../sprite/Background'

export default class Debug extends Game {
    public bg: Background
    public o1: Body
    public o2: Body
    public o3: Body
    public o5: Body
    public o4: GameObject
    public btn: Button

    public colManager: CollisionManager

    public constructor() {
        super(700, 400)

        Loader.loadAllImages([DINOSAUR_1, DINOSAUR_2, START_BACKGROUND], [])

        this.bg = new Background([START_BACKGROUND], 0, 700, 400)
        this.o1 = new Body(new Rectangle(100, 0, 100, 100, 'TRex'), [DINOSAUR_1])
        this.o4 = new GameObject(new Rectangle(100, 0, 100, 100, 'TRex'), [DINOSAUR_1])
        this.o2 = new Body(new Circle(320, 0, 20, 'o2'), [DINOSAUR_1])
        this.o5 = new Body(new Circle(300, 200, 20, 'o5'), [DINOSAUR_2])
        this.o3 = new Body(new Rectangle(100, 200, 100, 40, 'o3'), [DINOSAUR_1])
        this.colManager = new CollisionManager()
        this.btn = new Button("Button", 200, 100, 200, 50)

        this.colManager.add(this.o2)
        this.colManager.add(this.o3)
        this.colManager.add(this.o1)
        this.colManager.add(this.o5)
    }

    public update(lastTime: number): void {
        let currTime = Date.now()
        const deltaTime = currTime - lastTime

        if (Loader.isLoadComplete()) {
            //do some thing
            this.colManager.handleCollision()

            this.o1.update(deltaTime)
            this.o2.update(deltaTime)
            this.o3.update(deltaTime)
            this.o5.update(deltaTime)

            
            
            

            this.bg.render()
            this.o1.render()
            this.o2.render()
            this.o3.render()
            this.o4.render()
            this.o5.render()
            this.btn.render()
        }

        currTime = Date.now()
        super.update(currTime)
    }
}

const g = new Debug()

g.update(Date.now())
