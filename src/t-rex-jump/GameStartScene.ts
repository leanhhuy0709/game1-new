import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import Scene from '../engine/scene/Scene'
import SceneManager from '../engine/scene/SceneManager'
import Background from '../engine/sprite/Background'

import TRex from './TRex'
import TRexScore from './TRexScore'
import { START_BACKGROUND } from './const'

class GameStartScene extends Scene {
    private tRex: TRex
    private text: Text
    private background: Background
    private startBtn: Button
    private settingBtn: Button
    private exitBtn: Button

    public constructor() {
        super('GameOverScene')
        this.tRex = new TRex(20, 550, 100, 100, 100)
        this.text = new Text('T-Rex Jump', 350, 120, `50px Comic Sans MS`, 'center', '#713B61')
        this.background = new Background([START_BACKGROUND], 0, 700, 400)
        this.startBtn = new Button('Start', 350, 220, 200, 50)
        this.settingBtn = new Button('Setting', 350, 280, 200, 50)
        this.exitBtn = new Button('Exit', 350, 340, 200, 50)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public update(deltaTime: number): void {
        this.tRex.update(deltaTime)

        const mouseHoverCoord = this.input.getMouseHoverCoord()
        const x = mouseHoverCoord.getX()
        const y = mouseHoverCoord.getY()
        this.startBtn.isHovered(x, y)
        this.settingBtn.isHovered(x, y)
        this.exitBtn.isHovered(x, y)

        if (this.input.isMouseDown()) {
            const mouseCoord = this.input.getMouseCoord()
            if (this.startBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GamePlayScene')
            } else if (this.settingBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GameSettingScene')
            } else if (this.exitBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GameStartScene')
            }
        } else if (this.input.isTouchDown()) {
            const touchCoord = this.input.getTouchCoord()
            if (this.startBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                SceneManager.setNextScene('GamePlayScene')
            } else if (this.settingBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                SceneManager.setNextScene('GameSettingScene')
            } else if (this.exitBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                SceneManager.setNextScene('GameStartScene')
            }
            this.input.resetTouch()
        }
    }

    public render(): void {
        /*
        Renderer.addToQueue(this.background, 0)
        Renderer.addToQueue(this.text, 5)
        Renderer.addToQueue(this.startBtn, 5)
        Renderer.addToQueue(this.settingBtn, 5)
        Renderer.addToQueue(this.exitBtn, 5)

        TRexScore.getHighScoreText().setAlign('center')
        TRexScore.getHighScoreText().setCoord(350, 170)
        Renderer.addToQueue(TRexScore.getHighScoreText(), 5)

        Renderer.addToQueue(this.tRex, 7)
        */
        this.background.render()
        this.text.render()

        this.startBtn.render()
        this.settingBtn.render()
        this.exitBtn.render()
        this.tRex.render()

        //TRexScore.getHighScoreText().setAlign('center')
        //TRexScore.showHighScore(350, 170)
        
    }
}

export default GameStartScene
