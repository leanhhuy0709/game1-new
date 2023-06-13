import Button from '../component/Button'
import Text from '../component/Text'
import Scene from '../engine/Scene'
import SceneManager from '../engine/SceneManager'
import Background from './Background'
import TRex from './TRex'
import TRexScore from './TRexScore'

const BACKGROUND = 'assets/background/5.png'

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
        this.text = new Text('T-Rex Jump', `50px Comic Sans MS`, 'center', 'red')
        this.background = new Background([BACKGROUND, BACKGROUND], 0, 700, 400)
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
            }
            if (this.settingBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GameSettingScene')
            }
            if (this.exitBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GameStartScene')
            }
        }
    }

    public render(): void {
        this.background.render()
        this.text.render(350, 120, 10)
        this.tRex.render()
        this.startBtn.render()
        this.settingBtn.render()
        this.exitBtn.render()
        TRexScore.getHighScoreText().setAlign('center')
        TRexScore.showHighScore(350, 170)
    }
}

export default GameStartScene
