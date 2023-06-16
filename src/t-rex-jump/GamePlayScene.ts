/*
import CollisionManager from '../engine/physics/CollisionManager'
import Renderer from '../engine/renderer/Renderer'
import Scene from '../engine/scene/Scene'
import SceneManager from '../engine/scene/SceneManager'
import Sound from '../engine/sound/Sound'
import Background from '../engine/sprite/Background'
import DecorObjectManager from './DecorObjectManager'
import ObstacleManager from './ObstacleManager'
import TRex from './TRex'
import TRexScore from './TRexScore'
import { CLOUD_BACKGROUND, GROUND, MOUTAIN } from './const'

class GamePlayScene extends Scene {
    private tRex: TRex
    private background: Background
    private obstacleManager: ObstacleManager
    private decorManager: DecorObjectManager
    private sound: Sound
    private ground: Background
    private moutain: Background
    private colManager: CollisionManager
    public constructor() {
        super('GamePlayScene')
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
    }

    public update(deltaTime: number): void {
        
        if (this.input.isTouchDown()) {
            if (this.input.getDirectTouch() == 'U') {
                if (!this.tRex.isJumpOrFall()) {
                    this.tRex.move()
                    this.tRex.jump()
                }
            } else if (this.input.getDirectTouch() == 'D') {
                if (!this.tRex.isJumpOrFall()) {
                    this.tRex.duck()
                }
            }
            this.input.resetTouch()
        } else {
            if (this.input.isKeyDown('Space')) {
                if (!this.tRex.isJumpOrFall()) {
                    this.tRex.move()
                    this.tRex.jump()
                }
            } else if (this.input.isKeyUp('Space')) {
                if (this.tRex.isJump()) this.tRex.fall()
            }

            if (this.input.isKeyDown('ArrowDown')) {
                if (!this.tRex.isJumpOrFall()) this.tRex.duck()
            } else if (this.input.isKeyUp('ArrowUp')) {
                this.tRex.move()
            }
        }

        this.tRex.update(deltaTime)
        this.background.update(deltaTime)
        this.obstacleManager.update(deltaTime)
        this.ground.update(deltaTime)
        this.moutain.update(deltaTime)
        this.decorManager.update(deltaTime)
        this.colManager.handleCollision()

        if (this.obstacleManager.checkCollision(this.tRex))
        {
            SceneManager.setNextScene('GameOverScene')
        }

        if (!this.sound.isPlaying()) this.sound.play()

        TRexScore.addWithDeltaTime(deltaTime, 0.05)
        TRexScore.updateLevel()
    }

    public render(): void {
        Renderer.addToQueue(this.background, 0)
        Renderer.addToQueue(this.moutain, 1)
        Renderer.addToQueue(this.ground, 2)

        Renderer.addToQueue(this.obstacleManager, 6)
        Renderer.addToQueue(this.decorManager, 5)
        Renderer.addToQueue(this.tRex, 7)
        

        TRexScore.getScoreText().setCoord(5, 25)
        Renderer.addToQueue(TRexScore.getScoreText(), 5)

        TRexScore.getHighScoreText().setAlign('end')
        TRexScore.getHighScoreText().setCoord(700, 25)
        Renderer.addToQueue(TRexScore.getHighScoreText(), 5)
        
    }

    public clear(): void {
        super.clear()
        this.sound.stop()
    }
}

export default GamePlayScene
*/