//import Button from '../component/Button'
import Game from '../engine/Game'
import Renderer from '../engine/Renderer'
import SceneManager from '../engine/SceneManager'
import GameOverScene from './GameOverScene'
import GamePlayScene from './GamePlayScene'
import GameSettingScene from './GameSettingScene'
import GameStartScene from './GameStartScene'

class TRexJump extends Game {
    private sceneManager: SceneManager
    private static gameSpeed: number

    public constructor() {
        super(700, 400)
        this.sceneManager = new SceneManager(new GameStartScene())
        TRexJump.gameSpeed = 5
    }

    public start(): void {
        //
        super.start()
        this.update(Date.now())
    }

    public update(lastTime: number): void {
        let currTime = Date.now()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const deltaTime = (currTime - lastTime) / 10

        this.sceneManager.update(deltaTime)
        this.sceneManager.render()

        if (this.sceneManager.isNeedToChangeScene()) {
            switch (SceneManager.getNextScene()) {
                case 'GamePlayScene':
                    this.sceneManager.setNewScene(new GamePlayScene())
                    break
                case 'GameOverScene':
                    this.sceneManager.setNewScene(new GameOverScene())
                    break
                case 'GameStartScene':
                    this.sceneManager.setNewScene(new GameStartScene())
                    break
                case 'GameSettingScene':
                    this.sceneManager.setNewScene(new GameSettingScene())
                    break
            }
        }

        Renderer.drawAll()

        currTime = Date.now()
        super.update(currTime)
    }

    public static getGameSpeed(): number {
        return TRexJump.gameSpeed
    }

    public static setGameSpeed(speed: number): void {
        TRexJump.gameSpeed = speed
    }
}

const g = new TRexJump()
g.start()

export default TRexJump
