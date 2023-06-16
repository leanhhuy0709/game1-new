
import Background from '../engine/component/Background'
import Picture from '../engine/component/Picture'
import Collider from '../engine/component/physics/Collider'
import Movement from '../engine/component/physics/Movement'
import GameObject from '../engine/game-objects/GameObject'

import Scene from '../engine/scene/Scene'
import Cactus from './Cactus'
import FlyDino from './FlyDino'
import Obstacle from './Obstacle'
import ObstacleManager from './ObstacleManager'

import TRex from './TRex'
import { CLOUD_BACKGROUND, GROUND, MOUTAIN } from './const'
import { DEPTH } from './depth'

const CAMERA_SPEED = 1

class GamePlayScene extends Scene {
    public constructor() {
        super('GamePlayScene', CAMERA_SPEED)
        //console.log(this.renderer)

        
        const tRex = new TRex(0, 100, 100, 100, CAMERA_SPEED)
        this.addObject(tRex)

        const bg = new GameObject(0, 0, 1000, 400)
        bg.addComponent(new Background(bg, CLOUD_BACKGROUND, DEPTH.BACKGROUND_MEDIUM))
        //bg.addComponent(new Movement(bg, 0, 0, 0))
        this.addObject(bg)

        const ground = new GameObject(0, 350, 10000, 100)
        ground.addComponent(new Picture(ground, GROUND, DEPTH.BACKGROUND_HIGH))
        ground.addComponent(new Collider(ground))
        this.addObject(ground)

        //const cactus = new Cactus(1000)
        const flydino = new FlyDino(600)
        console.log(flydino)
        //this.addObject(cactus)
        this.addObject(flydino)



        

        /*super('GamePlayScene')
        Sound.setCanPlay()
        this.tRex = new TRex(15, 0, 100, 100, 100)
        this.background = new Background([CLOUD_BACKGROUND], -0.7, 1000, 400)
        this.ground = new Background([GROUND], 0, 1000, 400)
        this.moutain = new Background([MOUTAIN], -0.5, 1000, 400)

        this.obstacleManager = new ObstacleManager()
        this.decorManager = new DecorObjectManager()
        this.colManager = new CollisionManager()

        //for (let i = 0; i < this.decorManager.getDecors().length; i++)
            //this.colManager.add(this.decorManager.getDecors()[i])
        this.sound = new Sound('assets/sound/music1.mp3')
        this.sound.play()

        TRexScore.reset()
        */
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
    }

    public clear(): void {
        super.clear()
        //this.sound.stop()
    }
}

export default GamePlayScene
