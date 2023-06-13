import Renderer from '../engine/Renderer'
import Scene from '../engine/Scene'
import SceneManager from '../engine/SceneManager'
import Sound from '../engine/Sound'
import Background from './Background'
import CloudManager from './CloudManager'
import ObstacleManager from './ObstacleManager'
import TRex from './TRex'
import TRexScore from './TRexScore'

const BACKGROUND_LIST = [
    'assets/background/1.png',
    'assets/background/3.png',
    'assets/background/2.png',
]

class GamePlayScene extends Scene {
    private tRex: TRex
    private background: Background
    private obstacleManager: ObstacleManager
    private cloudManager: CloudManager
    private sound: Sound
    public constructor() {
        super('GamePlayScene')
        this.tRex = new TRex(15, 0, 100, 100, 100)
        this.background = new Background(BACKGROUND_LIST, 0, 1000, 400)
        this.obstacleManager = new ObstacleManager()
        this.cloudManager = new CloudManager()
        this.sound = new Sound('assets/sound/music1.mp3')
        this.sound.play()
        TRexScore.reset()
    }

    public update(deltaTime: number): void {
        if (this.input.isKeyDown('Space')) {
            if (!this.tRex.isJumpOrFall()) this.tRex.jump()
        } else if (this.input.isKeyUp('Space')) {
            if (this.tRex.isJump()) this.tRex.fall()
        }

        //ArrowDown
        if (this.input.isKeyDown('ArrowDown')) {
            if (!this.tRex.isJumpOrFall()) this.tRex.duck()
        } else if (this.input.isKeyUp('ArrowUp')) {
            this.tRex.move()
        }

        this.tRex.update(deltaTime)
        this.background.update(deltaTime)
        this.obstacleManager.update(deltaTime)
        this.cloudManager.update(deltaTime)

        if (this.obstacleManager.checkCollision(this.tRex)) {
            //Go to new scene
            console.log('TRex dead!')
            SceneManager.setNextScene('GameOverScene')
        }

        if (!this.sound.isPlaying()) this.sound.play()

        TRexScore.addWithDeltaTime(deltaTime, 0.05)
    }

    public render(): void {
        Renderer.addToQueue(this.background, 0)
        Renderer.addToQueue(this.obstacleManager, 6)
        Renderer.addToQueue(this.cloudManager, 5)
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
