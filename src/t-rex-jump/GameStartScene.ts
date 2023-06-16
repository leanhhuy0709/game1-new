import Background from '../engine/component/Background'
import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import GameObject from '../engine/game-objects/GameObject'
import Scene from '../engine/scene/Scene'
//import SceneManager from '../engine/scene/SceneManager'
import { DEPTH } from './depth'


import TRex from './TRex'
import { START_BACKGROUND } from './const'

class GameStartScene extends Scene {
    public constructor(cameraSpeed = 0) {
        super('GameStartScene', cameraSpeed)

        const tRex = new TRex(0, 0, 100, 100, 0)
        this.addObject(tRex)

        const textBox = new GameObject(350, 120, 0, 0)
        textBox.addComponent(new Text(textBox, DEPTH.OBJECT_MEDIUM, 'T-Rex Jump', '50px Comic Sans MS', 'center', '#713B61'))
        this.addObject(textBox)

        const bg = new GameObject(0, 0, 1000, 400)
        bg.addComponent(new Background(bg, START_BACKGROUND, DEPTH.BACKGROUND_MEDIUM))
        this.addObject(bg)

        const startBtn = new GameObject(250, 195, 200, 50)
        startBtn.addComponent(new Button(startBtn, DEPTH.OBJECT_MEDIUM, 'Start'))
        this.addObject(startBtn)

        const settingBtn = new GameObject(250, 255, 200, 50)
        settingBtn.addComponent(new Button(settingBtn, DEPTH.OBJECT_MEDIUM, 'Setting'))
        this.addObject(settingBtn)

        const exitBtn = new GameObject(250, 315, 200, 50)
        exitBtn.addComponent(new Button(exitBtn, DEPTH.OBJECT_MEDIUM, 'Exit'))
        this.addObject(exitBtn)
    }

    public update(deltaTime: number): void {
        /*
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
        */

        super.update(deltaTime)
    }

}

export default GameStartScene
