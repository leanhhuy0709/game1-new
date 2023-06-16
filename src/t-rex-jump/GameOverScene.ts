
import Background from '../engine/component/Background'
import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import GameObject from '../engine/game-objects/GameObject'
import Scene from '../engine/scene/Scene'
import SceneManager from '../engine/scene/SceneManager'

import { GAMEOVER_BACKGROUND } from './const'
import { DEPTH } from './depth'

export default class GameOverScene extends Scene {
    public constructor(sceneManager: SceneManager, cameraSpeed = 0) {
        super(sceneManager, 'GameOverScene', cameraSpeed)

        const textBox = new GameObject(350, 120, 0, 0)
        textBox.addComponent(new Text(textBox, DEPTH.OBJECT_MEDIUM, 'Game Over', '50px Comic Sans MS', 'center', '#713B61'))
        this.addObject(textBox)

        const bg = new GameObject(0, 0, 700, 400)
        bg.addComponent(new Background(bg, GAMEOVER_BACKGROUND, DEPTH.BACKGROUND_MEDIUM))
        this.addObject(bg)

        const startBtn = new GameObject(250, 195, 200, 50)
        startBtn.addComponent(new Button(startBtn, DEPTH.OBJECT_MEDIUM, 'Try again'))
        this.addObject(startBtn)

        const settingBtn = new GameObject(250, 255, 200, 50)
        settingBtn.addComponent(new Button(settingBtn, DEPTH.OBJECT_MEDIUM, 'Setting'))
        this.addObject(settingBtn)

        const exitBtn = new GameObject(250, 315, 200, 50)
        exitBtn.addComponent(new Button(exitBtn, DEPTH.OBJECT_MEDIUM, 'Exit'))
        this.addObject(exitBtn)
    }
    
    public update(deltaTime: number): void {
        const mouseHoverCoord = this.input.getMouseHoverCoord()
        const x = mouseHoverCoord.getX() - this.renderer.getCamera().getX()
        const y = mouseHoverCoord.getY() - this.renderer.getCamera().getY()

        const stBtn = this.gameObjects[2].getComponent<Button>(Button)[0]
        const setBtn = this.gameObjects[3].getComponent<Button>(Button)[0]
        const exBtn = this.gameObjects[4].getComponent<Button>(Button)[0]

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
        
        super.update(deltaTime)
    }
}

 GameOverScene
