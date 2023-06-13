import Button from '../component/Button'
import Text from '../component/Text'
import Scene from '../engine/Scene'
import SceneManager from '../engine/SceneManager'
import Background from './Background'
import TRexScore from './TRexScore'

const BACKGROUND = 'assets/background/4.png'

class GameOverScene extends Scene {
    private text: Text
    private background: Background
    private tryAgainBtn: Button
    private settingBtn: Button
    private exitBtn: Button

    public constructor() {
        super('GameOverScene')
        //Comic Sans MS
        this.text = new Text('Game Over', `50px Comic Sans MS`, 'center', 'red')
        this.background = new Background([BACKGROUND, BACKGROUND], 0, 700, 400)
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
        this.text.render(350, 150, 10)
        this.tryAgainBtn.render()
        this.settingBtn.render()
        this.exitBtn.render()
        TRexScore.showScore(5, 25)

        TRexScore.getHighScoreText().setAlign('end')
        TRexScore.showHighScore(700, 25)
    }
}

export default GameOverScene
