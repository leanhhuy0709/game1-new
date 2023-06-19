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
import { CLOUD_BACKGROUND, GROUND, MOUTAIN, MUSIC1 } from './const'
import { DEPTH } from './depth'
import Text from '../engine/component/Text'
import Score from '../engine/score/Score'
import CollisionManager from '../engine/component/physics/CollisionManager'
import Sound from '../engine/sound/Sound'

const CAMERA_SPEED = 1.8

class GamePlayScene extends Scene {
    private obstacleManager: ObstacleManager
    private scoreText: GameObject
    private highScoreText: GameObject
    private ground1: GameObject
    private ground2: GameObject
    private ground3: GameObject
    private sound: Sound

    public constructor(sceneManager: SceneManager) {
        super(sceneManager, 'GamePlayScene', CAMERA_SPEED)
        //console.log(this.renderer)

        const tRex = new TRex(0, 100, 100, 100, CAMERA_SPEED)
        this.addObject(tRex)

        const bg = new GameObject(0, 0, 1000, 400)
        bg.addComponent(new Background(bg, CLOUD_BACKGROUND, DEPTH.BACKGROUND_MEDIUM))
        //bg.addComponent(new Movement(bg, 0, 0, 0))
        this.addObject(bg)

        this.ground1 = new GameObject(0, 350, 4000, 100)
        this.ground1.addComponent(new Picture(this.ground1, GROUND, DEPTH.BACKGROUND_HIGH))
        this.ground1.addComponent(new Collider(this.ground1))
        this.addObject(this.ground1)

        const cactus1 = new Cactus(100)
        const cactus2 = new Cactus(100)
        const cactus3 = new Cactus(100)
        //const cactus4 = new Cactus(100)
        const flydino1 = new FlyDino(100)
        const flydino2 = new FlyDino(100)
        this.obstacleManager = new ObstacleManager()
        this.obstacleManager.add(cactus1)
        this.obstacleManager.add(cactus2)
        this.obstacleManager.add(cactus3)
        //this.obstacleManager.add(cactus4)
        this.obstacleManager.add(flydino1)
        this.obstacleManager.add(flydino2)
        this.obstacleManager.reset(this.getCamera())

        this.addObject(cactus1)
        this.addObject(cactus2)
        this.addObject(cactus3)
        //this.addObject(cactus4)
        this.addObject(flydino1)
        this.addObject(flydino2)

        const bg2 = new GameObject(0, 0, 1000, 400)
        bg2.addComponent(new Background(bg2, MOUTAIN, DEPTH.BACKGROUND_MEDIUM))
        bg2.addComponent(new Movement(bg2, 0.1, -1, 0))
        this.addObject(bg2)

        const scoreText = new GameObject(10, 30, 100, 100)
        scoreText.addComponent(
            new Text(
                scoreText,
                DEPTH.OBJECT_LOW,
                `${Score.getScore()}`,
                '30px Comic Sans MS',
                'start',
                '#000000'
            )
        )
        this.addObject(scoreText)
        this.scoreText = scoreText

        const highScoreText = new GameObject(700, 30, 100, 100)
        highScoreText.addComponent(
            new Text(
                highScoreText,
                DEPTH.OBJECT_LOW,
                `${Score.getHighScore()}`,
                '30px Comic Sans MS',
                'end',
                '#000000'
            )
        )
        this.addObject(highScoreText)
        this.highScoreText = highScoreText

        this.ground2 = new GameObject(4000, 300, 4000, 100)
        this.ground2.addComponent(new Picture(this.ground2, GROUND, DEPTH.BACKGROUND_HIGH))
        this.ground2.addComponent(new Collider(this.ground2))
        this.addObject(this.ground2)

        this.ground3 = new GameObject(8000, 325, 4000, 100)
        this.ground3.addComponent(new Picture(this.ground3, GROUND, DEPTH.BACKGROUND_HIGH))
        this.ground3.addComponent(new Collider(this.ground3))
        this.addObject(this.ground3)

        Sound.setCanPlay()
        this.sound = new Sound(MUSIC1)
        this.sound.play()

        Score.resetScore()
        Score.resetLevel()
    }

    public update(deltaTime: number): void {
        if (this.ground1.getX() + this.ground1.getWidth() <= this.getCamera().getX()) {
            this.ground1.setX(this.ground3.getX() + this.ground3.getWidth())
        } else if (
            this.ground2.getX() + this.ground2.getWidth() <=
            this.getCamera().getX()
        ) {
            this.ground2.setX(this.ground1.getX() + this.ground1.getWidth())
        }
        else if (
            this.ground3.getX() + this.ground3.getWidth() <=
            this.getCamera().getX()
        ) {
            this.ground3.setX(this.ground2.getX() + this.ground2.getWidth())
        }

        const tRex = this.gameObjects[0] as TRex
        if (this.input.isKeyDown('Space')) {
            tRex.jump()
        } else if (this.input.isKeyUp('Space')) {
            if (tRex.getMinJump() >= 90) {
                tRex.fall()
                this.input.resetAllKeyEvent()
            }
        }

        this.obstacleManager.update(deltaTime, this.getCamera())
        if (this.obstacleManager.checkCollision(tRex)) {
            this.sceneManager.setNextScene('GameOverScene')
        }

        this.scoreText.getComponent<Text>(Text)[0].setContent(`${Math.floor(Score.getScore())}`)
        this.highScoreText
            .getComponent<Text>(Text)[0]
            .setContent(`${Math.floor(Score.getHighScore())}`)

        Score.addWithDeltaTime(deltaTime, 0.1)

        if (Score.getScore() > Score.getLevel() * 1000)
        {
            tRex.getComponent<Movement>(Movement)[0].addVeloctity(0.5, 1, 0)
            tRex.setDefaultSpeed(tRex.getDefaultSpeed() + 0.5)
            Score.setLevel(Score.getLevel() + 1)
            this.getCamera().setSpeed(this.getCamera().getSpeed() + 0.5)
        }


        super.update(deltaTime)
        if (CollisionManager.checkCollision(tRex, this.ground1) && tRex.getX() < this.ground1.getX())
            this.sceneManager.setNextScene('GameOverScene')
        if (CollisionManager.checkCollision(tRex, this.ground2) && tRex.getX() < this.ground2.getX())
            this.sceneManager.setNextScene('GameOverScene')
        if (CollisionManager.checkCollision(tRex, this.ground3) && tRex.getX() < this.ground3.getX())
            this.sceneManager.setNextScene('GameOverScene')
    }

    public clear(): void {
        super.clear()
        this.sound.stop()
    }
}

export default GamePlayScene
