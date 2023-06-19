
import Background from '../engine/component/Background'
import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import GameObject from '../engine/game-objects/GameObject'
import Scene from '../engine/scene/Scene'
import SceneManager from '../engine/scene/SceneManager'
import Sound from '../engine/sound/Sound'
import TRex from './TRex'
import { SETTING_BACKGROUND } from './const'
import { DEPTH } from './depth'

export default class GameSettingScene extends Scene {
    private tRex: TRex
    private textBox: GameObject
    private textBox2: GameObject
    private bg: GameObject
    private plusBtn: GameObject
    private minusBtn: GameObject
    private exitBtn: GameObject
    public constructor(sceneManager: SceneManager, cameraSpeed = 0) {
        super(sceneManager, 'GameSettingScene', cameraSpeed)

        this.tRex = new TRex(0, 0, 100, 100, 0)
        this.addObject(this.tRex)

        this.textBox = new GameObject(350, 120, 0, 0)
        this.textBox.addComponent(new Text(this.textBox, DEPTH.OBJECT_MEDIUM, 'T-Rex Jump', '50px Comic Sans MS', 'center', '#713B61'))
        this.addObject(this.textBox)

        this.bg = new GameObject(0, 0, 1000, 400)
        this.bg.addComponent(new Background(this.bg, SETTING_BACKGROUND, DEPTH.BACKGROUND_MEDIUM))
        this.addObject(this.bg)

        this.textBox2 = new GameObject(350, 210, 0, 0)
        this.textBox2.addComponent(new Text(this.textBox2, DEPTH.OBJECT_MEDIUM, `${Math.floor(Sound.getVolume())}`, '35px Comic Sans MS', 'center', 'black'))
        this.addObject(this.textBox2)

        this.plusBtn = new GameObject(385, 175, 50, 50)
        this.plusBtn.addComponent(new Button(this.plusBtn, DEPTH.OBJECT_MEDIUM, '+'))
        this.addObject(this.plusBtn)

        this.minusBtn = new GameObject(265, 175, 50, 50)
        this.minusBtn.addComponent(new Button(this.minusBtn, DEPTH.OBJECT_MEDIUM, '-'))
        this.addObject(this.minusBtn)

        this.exitBtn = new GameObject(250, 255, 200, 50)
        this.exitBtn.addComponent(new Button(this.exitBtn, DEPTH.OBJECT_MEDIUM, 'Exit'))
        this.addObject(this.exitBtn)
    }

    public update(deltaTime: number): void {

        const mouseHoverCoord = this.input.getMouseHoverCoord()
        const x = mouseHoverCoord.getX() - this.getCamera().getX()
        const y = mouseHoverCoord.getY() - this.getCamera().getY()

        const plusBtn = this.plusBtn.getComponent<Button>(Button)[0]
        const minusBtn = this.minusBtn.getComponent<Button>(Button)[0]
        const exBtn = this.exitBtn.getComponent<Button>(Button)[0]

        plusBtn.isHovered(x, y)
        minusBtn.isHovered(x, y)
        exBtn.isHovered(x, y)

        if (this.input.isMouseDown()) {
            const mouseCoord = this.input.getMouseCoord()
            if (plusBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                Sound.setVolume(Sound.getVolume() + 1)
            } else if (minusBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                Sound.setVolume(Sound.getVolume() - 1)
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

        this.textBox2.getComponent<Text>(Text)[0].setContent(`${Math.floor(Sound.getVolume())}`)

        super.update(deltaTime)
    }
}

