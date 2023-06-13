import Scene from '../engine/Scene'
import SceneManager from '../engine/SceneManager'
import Background from './Background'
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
    public constructor() {
        super('GamePlayScene')
        this.tRex = new TRex(15, 0, 100, 100, 100)
        this.background = new Background(BACKGROUND_LIST, 0, 1000, 400)
        this.obstacleManager = new ObstacleManager()
        TRexScore.reset()
    }

    public update(deltaTime: number): void {
        if (this.input.isKeyDown('Space')) {
            if (!this.tRex.isJumpOrFall()) this.tRex.jump()
        } else if (this.input.isKeyUp('Space')) {
            if (this.tRex.isJump()) this.tRex.fall()
        }
        this.tRex.update(deltaTime)
        this.background.update(deltaTime)
        this.obstacleManager.update(deltaTime)

        if (this.obstacleManager.checkCollision(this.tRex)) {
            //Go to new scene
            console.log('TRex dead!')
            SceneManager.setNextScene('GameOverScene')
        }

        TRexScore.addWithDeltaTime(deltaTime, 0.05)
    }

    public render(): void {
        this.background.render()
        this.obstacleManager.render()
        this.tRex.render()

        TRexScore.showScore(5, 25)

        TRexScore.getHighScoreText().setAlign('end')
        TRexScore.showHighScore(700, 25)
    }

    public clear(): void {
        super.clear()
    }
}

export default GamePlayScene
