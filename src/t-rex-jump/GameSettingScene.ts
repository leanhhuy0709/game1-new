
import Background from '../engine/component/Background'
import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import GameObject from '../engine/game-objects/GameObject'
import Scene from '../engine/scene/Scene'
import SceneManager from '../engine/scene/SceneManager'
import TRex from './TRex'
import { SETTING_BACKGROUND } from './const'
import { DEPTH } from './depth'

export default class GameSettingScene extends Scene {
    public constructor(sceneManager: SceneManager, cameraSpeed = 0) {
        super(sceneManager, 'GameSettingScene', cameraSpeed)

        const tRex = new TRex(0, 0, 100, 100, 0)
        this.addObject(tRex)

        const textBox = new GameObject(350, 120, 0, 0)
        textBox.addComponent(new Text(textBox, DEPTH.OBJECT_MEDIUM, 'T-Rex Jump', '50px Comic Sans MS', 'center', '#713B61'))
        this.addObject(textBox)

        const bg = new GameObject(0, 0, 1000, 400)
        bg.addComponent(new Background(bg, SETTING_BACKGROUND, DEPTH.BACKGROUND_MEDIUM))
        this.addObject(bg)

        const textBox2 = new GameObject(350, 210, 0, 0)
        textBox2.addComponent(new Text(textBox2, DEPTH.OBJECT_MEDIUM, `${100}`, '35px Comic Sans MS', 'center', 'black'))
        this.addObject(textBox2)

        const startBtn = new GameObject(385, 175, 50, 50)
        startBtn.addComponent(new Button(startBtn, DEPTH.OBJECT_MEDIUM, '+'))
        this.addObject(startBtn)

        const settingBtn = new GameObject(265, 175, 50, 50)
        settingBtn.addComponent(new Button(settingBtn, DEPTH.OBJECT_MEDIUM, '-'))
        this.addObject(settingBtn)

        const exitBtn = new GameObject(250, 255, 200, 50)
        exitBtn.addComponent(new Button(exitBtn, DEPTH.OBJECT_MEDIUM, 'Exit'))
        this.addObject(exitBtn)
    }

    public update(deltaTime: number): void {

        const mouseHoverCoord = this.input.getMouseHoverCoord()
        const x = mouseHoverCoord.getX() - this.getCamera().getX()
        const y = mouseHoverCoord.getY() - this.getCamera().getY()

        const plusBtn = this.gameObjects[4].getComponent<Button>(Button)[0]
        const minusBtn = this.gameObjects[5].getComponent<Button>(Button)[0]
        const exBtn = this.gameObjects[6].getComponent<Button>(Button)[0]

        plusBtn.isHovered(x, y)
        minusBtn.isHovered(x, y)
        exBtn.isHovered(x, y)

        if (this.input.isMouseDown()) {
            const mouseCoord = this.input.getMouseCoord()
            if (plusBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                //
            } else if (minusBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                //
            } else if (exBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                this.sceneManager.setNextScene('GameStartScene')
            }
        } else if (this.input.isTouchDown()) {
            const touchCoord = this.input.getTouchCoord()
            if (plusBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                //
            } else if (minusBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                //
            } else if (exBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                this.sceneManager.setNextScene('GameStartScene')
            }
            this.input.resetTouch()
        }

        super.update(deltaTime)
    }
}

