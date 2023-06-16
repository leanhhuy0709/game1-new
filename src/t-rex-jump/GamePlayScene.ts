import Background from '../engine/component/Background'
import Picture from '../engine/component/Picture'
import Collider from '../engine/component/physics/Collider'
import Movement from '../engine/component/physics/Movement'
import GameObject from '../engine/game-objects/GameObject'

import Scene from '../engine/scene/Scene'
import SceneManager from '../engine/scene/SceneManager'
import Cactus from './Cactus'
import FlyDino from './FlyDino'
import ObstacleManager from './ObstacleManager'

import TRex from './TRex'
import { CLOUD_BACKGROUND, GROUND, MOUTAIN } from './const'
import { DEPTH } from './depth'

const CAMERA_SPEED = 1.5

class GamePlayScene extends Scene {
    public constructor(sceneManager: SceneManager) {
        super(sceneManager, 'GamePlayScene', CAMERA_SPEED)
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

        const cactus1 = new Cactus(100)
        const cactus2 = new Cactus(100)
        const cactus3 = new Cactus(100)
        const cactus4 = new Cactus(100)
        const cactus5 = new Cactus(100)
        const flydino1 = new FlyDino(100)
        const flydino2 = new FlyDino(100)
        const flydino3 = new FlyDino(100)
        const obstacleManager = new ObstacleManager()
        obstacleManager.add(cactus1)
        obstacleManager.add(cactus2)
        obstacleManager.add(cactus3)
        obstacleManager.add(cactus4)
        obstacleManager.add(cactus5)
        obstacleManager.add(flydino1)
        obstacleManager.add(flydino2)
        obstacleManager.add(flydino3)
        obstacleManager.reset()

        this.addObject(obstacleManager)
        this.addObject(cactus1)
        this.addObject(cactus2)
        this.addObject(cactus3)
        this.addObject(cactus4)
        this.addObject(cactus5)
        this.addObject(flydino1)
        this.addObject(flydino2)
        this.addObject(flydino3)

        const bg2 = new GameObject(0, 0, 1000, 400)
        bg2.addComponent(new Background(bg2, MOUTAIN, DEPTH.BACKGROUND_MEDIUM))
        bg2.addComponent(new Movement(bg2, 0.15, -1, 0))
        this.addObject(bg2)
        //const flydino = new FlyDino(600)
        //console.log(flydino)
        //this.addObject(cactus)
        //this.addObject(flydino)
    }

    public update(deltaTime: number): void {
        const tRex = this.gameObjects[0] as TRex
        if (this.input.isKeyDown('Space')) {
            tRex.jump()
        } else if (this.input.isKeyUp('Space')) {
            if (tRex.getMinJump() >= 150) {
                tRex.fall()
                this.input.resetAllKeyEvent()
            }
        }

        const obstacleManager = this.gameObjects[3] as ObstacleManager
        if (obstacleManager.checkCollision(tRex)) {
            this.sceneManager.setNextScene('GameOverScene')
        }

        super.update(deltaTime)
    }

    public clear(): void {
        super.clear()
        //this.sound.stop()
    }
}

export default GamePlayScene
