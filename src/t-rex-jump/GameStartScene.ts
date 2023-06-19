import Background from '../engine/component/Background'
import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import GameObject from '../engine/game-objects/GameObject'
import Scene from '../engine/scene/Scene'
//import SceneManager from '../engine/scene/SceneManager'
import { DEPTH } from './depth'

import TRex from './TRex'
import { START_BACKGROUND } from './const'
import SceneManager from '../engine/scene/SceneManager'
import Score from '../engine/score/Score'

class GameStartScene extends Scene {
    private tRex: TRex
    private textBox: GameObject
    private highScoreText: GameObject
    private bg: GameObject
    private startBtn: GameObject
    private settingBtn: GameObject
    private exitBtn: GameObject
    public constructor(sceneManager: SceneManager, cameraSpeed = 0) {
        super(sceneManager, 'GameStartScene', cameraSpeed)

        this.tRex = new TRex(0, 0, 100, 100, 0)
        this.addObject(this.tRex)

        this.textBox = new GameObject(350, 120, 0, 0)
        this.textBox.addComponent(
            new Text(
                this.textBox,
                DEPTH.OBJECT_MEDIUM,
                'T-Rex Jump',
                '50px Comic Sans MS',
                'center',
                '#713B61'
            )
        )
        this.addObject(this.textBox)

        this.bg = new GameObject(0, 0, 700, 400)
        this.bg.addComponent(new Background(this.bg, START_BACKGROUND, DEPTH.BACKGROUND_MEDIUM))
        this.addObject(this.bg)

        this.startBtn = new GameObject(250, 195, 200, 50)
        this.startBtn.addComponent(new Button(this.startBtn, DEPTH.OBJECT_MEDIUM, 'Start'))
        this.addObject(this.startBtn)

        this.settingBtn = new GameObject(250, 255, 200, 50)
        this.settingBtn.addComponent(new Button(this.settingBtn, DEPTH.OBJECT_MEDIUM, 'Setting'))
        this.addObject(this.settingBtn)

        this.exitBtn = new GameObject(250, 315, 200, 50)
        this.exitBtn.addComponent(new Button(this.exitBtn, DEPTH.OBJECT_MEDIUM, 'Exit'))
        this.addObject(this.exitBtn)

        this.highScoreText = new GameObject(350, 175, 200, 50)
        this.highScoreText.addComponent(
            new Text(
                this.highScoreText,
                DEPTH.OBJECT_LOW,
                `Highscore: ${Score.getHighScore()}`,
                '30px Comic Sans MS',
                'center',
                '#000000'
            )
        )
        this.addObject(this.highScoreText)
    }

    public update(deltaTime: number): void {
        const mouseHoverCoord = this.input.getMouseHoverCoord()
        const x = mouseHoverCoord.getX() - this.getCamera().getX()
        const y = mouseHoverCoord.getY() - this.getCamera().getY()

        const stBtn = this.startBtn.getComponent<Button>(Button)[0]
        const setBtn = this.settingBtn.getComponent<Button>(Button)[0]
        const exBtn = this.exitBtn.getComponent<Button>(Button)[0]

        stBtn.isHovered(x, y)
        setBtn.isHovered(x, y)
        exBtn.isHovered(x, y)

        if (this.input.isMouseDown()) {
            const mouseCoord = this.input.getMouseCoord()
            if (stBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                this.sceneManager.setNextScene('GamePlayScene')
            } else if (setBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                this.sceneManager.setNextScene('GameSettingScene')
            } else if (exBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                this.sceneManager.setNextScene('GameStartScene')
            }
        } else if (this.input.isTouchDown()) {
            const touchCoord = this.input.getTouchCoord()
            if (stBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                this.sceneManager.setNextScene('GamePlayScene')
            } else if (setBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                this.sceneManager.setNextScene('GameSettingScene')
            } else if (exBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                this.sceneManager.setNextScene('GameStartScene')
            }
            this.input.resetTouch()
        }

        this.highScoreText.getComponent<Text>(Text)[0].setContent(`Highscore: ${Math.floor(Score.getHighScore())}`)

        super.update(deltaTime)
    }
}

export default GameStartScene
