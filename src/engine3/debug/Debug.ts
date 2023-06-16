import {
    CLOUD_BACKGROUND,
    DINOSAUR_1,
    DINOSAUR_2,
    DINOSAUR_3,
    DINOSAUR_4,
    DINOSAUR_5,
    DINOSAUR_6,
    DINOSAUR_7,
    DINOSAUR_8,
    DINOSAUR_MOVE_1,
    DINOSAUR_MOVE_2,
    DINOSAUR_MOVE_3,
    DINOSAUR_MOVE_4,
    DINOSAUR_MOVE_5,
    DINOSAUR_MOVE_6,
    DINOSAUR_MOVE_7,
    DINOSAUR_MOVE_8,
    GROUND,
    START_BACKGROUND,
} from '../../t-rex-jump/const'
import Game from '../Game'
import Picture from '../component/Picture'
import Sprite from '../component/Sprite'
import Body from '../component/physics/Body'
import CollisionManager from '../component/physics/CollisionManager'
import FixedBody from '../component/physics/FixedBody'
import Movement from '../component/physics/Movement'
import GameObject from '../game-objects/GameObject'
import InputHandler from '../input/InputHandler'
import Loader from '../loader/Loader'
import Renderer from '../renderer/Renderer'

export default class Debug extends Game {
    o1: GameObject
    o2: GameObject
    o3: GameObject
    renderer: Renderer
    input: InputHandler
    public constructor() {
        super(700, 400)
        Loader.loadAllImages([
            DINOSAUR_MOVE_1,
            DINOSAUR_MOVE_2,
            DINOSAUR_MOVE_3,
            DINOSAUR_MOVE_4,
            DINOSAUR_MOVE_5,
            DINOSAUR_MOVE_6,
            DINOSAUR_MOVE_7,
            DINOSAUR_MOVE_8,
            DINOSAUR_1,
            DINOSAUR_2,
            DINOSAUR_3,
            DINOSAUR_4,
            DINOSAUR_5,
            DINOSAUR_6,
            DINOSAUR_7,
            DINOSAUR_8,
            GROUND,
            START_BACKGROUND,
            CLOUD_BACKGROUND
        ])
        this.o1 = new GameObject(0, 0, 100, 100)
        //this.o1.addComponent(new Picture(this.o1, DINOSAUR_1))
        this.o1.addComponent(
            new Sprite(
                this.o1,
                [
                    DINOSAUR_MOVE_1,
                    DINOSAUR_MOVE_2,
                    DINOSAUR_MOVE_3,
                    DINOSAUR_MOVE_4,
                    DINOSAUR_MOVE_5,
                    DINOSAUR_MOVE_6,
                    DINOSAUR_MOVE_7,
                    DINOSAUR_MOVE_8,
                ],
                10,
                3
            )
        )
        const body = new Body(this.o1, 0, 0, 0)
        //body.addForce(new Force(0.01, 1, 0.3))
        this.o1.addComponent(body)

        this.o2 = new GameObject(0, 350, 700, 50)
        this.o2.addComponent(new Picture(this.o2, START_BACKGROUND, 1))

        this.o2.addComponent(new FixedBody(this.o2))

        this.o3 = new GameObject(0, 0, 1000, 400)
        this.o3.addComponent(new Picture(this.o3, CLOUD_BACKGROUND, 0))

        this.o3.addComponent(new Movement(this.o3, 0, 1, 0))

        this.input = new InputHandler()
        this.renderer = new Renderer(0)
        this.renderer.addToQueue(this.o1)
        this.renderer.addToQueue(this.o2)
        this.renderer.addToQueue(this.o3)
        this.renderer.sortQueue()
    }

    public update(lastTime: number): void {
        let currTime = Date.now()
        const deltaTime = currTime - lastTime

        if (this.input.isKeyDown('ArrowLeft'))
        {
            this.o1.setX(this.o1.getX() - 1)
        }
        else if (this.input.isKeyDown('ArrowRight'))
        {
            this.o1.setX(this.o1.getX() + 1)
        }
        else if (this.input.isKeyDown('ArrowUp'))
        {
            this.o1.setY(this.o1.getY() - 1)
        }
        else if (this.input.isKeyDown('ArrowDown'))
        {
            this.o1.setY(this.o1.getY() + 1)
        }

        this.o1.update(deltaTime)
        this.o2.update(deltaTime)
        this.o3.update(deltaTime)
        this.renderer.update(deltaTime)

        CollisionManager.checkCollision(this.o1, this.o2)
        //CollisionManager.checkCollision(this.o1, this.o3)


        this.renderer.renderAll()
        currTime = Date.now()
        super.update(currTime)
    }
}

const g = new Debug()

g.update(Date.now())
