import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import Renderer from '../engine/Renderer'
import Scene from '../engine/Scene'
import SceneManager from '../engine/SceneManager'
import Background from '../engine/Background'
import TRexScore from './TRexScore'
import { GAMEOVER_BACKGROUND } from './const'

class GameOverScene extends Scene {
    private text: Text
    private background: Background
    private tryAgainBtn: Button
    private settingBtn: Button
    private exitBtn: Button

    public constructor() {
        super('GameOverScene')
        //Comic Sans MS
        this.text = new Text('Game Over', 350, 150, `50px Comic Sans MS`, 'center', '#713B61')
        this.background = new Background([GAMEOVER_BACKGROUND], 0, 700, 400)
        this.tryAgainBtn = new Button('Try Again', 350, 220, 200, 50)
        this.settingBtn = new Button('Setting', 350, 280, 200, 50)
        this.exitBtn = new Button('Exit', 350, 340, 200, 50)
        // this.background = new Background(BACKGROUND_LIST, 0, 1000, 400)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public update(deltaTime: number): void {
        const mouseHoverCoord = this.input.getMouseHoverCoord()
        const x = mouseHoverCoord.getX()
        const y = mouseHoverCoord.getY()
        this.tryAgainBtn.isHovered(x, y)
        this.settingBtn.isHovered(x, y)
        this.exitBtn.isHovered(x, y)

        if (this.input.isMouseDown()) {
            const mouseCoord = this.input.getMouseCoord()
            if (this.tryAgainBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GamePlayScene')
            } else if (this.settingBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GameSettingScene')
            } else if (this.exitBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GameStartScene')
            }
        } else if (this.input.isTouchDown()) {
            const touchCoord = this.input.getTouchCoord()
            if (this.tryAgainBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                SceneManager.setNextScene('GamePlayScene')
            } else if (this.settingBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                SceneManager.setNextScene('GameSettingScene')
            } else if (this.exitBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                SceneManager.setNextScene('GameStartScene')
            }
        }
    }

    public render(): void {
        Renderer.addToQueue(this.background, 0)
        Renderer.addToQueue(this.text, 5)
        Renderer.addToQueue(this.tryAgainBtn, 5)
        Renderer.addToQueue(this.settingBtn, 5)
        Renderer.addToQueue(this.exitBtn, 5)

        TRexScore.getHighScoreText().setCoord(5, 25)
        Renderer.addToQueue(TRexScore.getScoreText(), 5)

        TRexScore.getHighScoreText().setAlign('end')
        TRexScore.getHighScoreText().setCoord(700, 25)
        Renderer.addToQueue(TRexScore.getHighScoreText(), 5)
        /*
        this.background.render()
        this.text.render()
        this.tryAgainBtn.render()
        this.settingBtn.render()
        this.exitBtn.render()
        TRexScore.showScore(5, 25)

        
        TRexScore.showHighScore(700, 25)
        */
    }
}

export default GameOverScene
