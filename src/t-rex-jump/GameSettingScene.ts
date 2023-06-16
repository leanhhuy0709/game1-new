/*
import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import Renderer from '../engine/renderer/Renderer'
import Scene from '../engine/scene/Scene'
import SceneManager from '../engine/scene/SceneManager'
import Sound from '../engine/sound/Sound'
import Background from '../engine/sprite/Background'
import TRex from './TRex'
import { SETTING_BACKGROUND } from './const'

class GameSettingScene extends Scene {
    private tRex: TRex
    private text: Text
    private background: Background
    private plusBtn: Button
    private minusBtn: Button
    private exitBtn: Button
    private volumeValue: Text

    public constructor() {
        super('GameSettingScene')
        this.tRex = new TRex(20, 550, 100, 100, 100)
        this.text = new Text('Setting', 350, 120, `50px Comic Sans MS`, 'center', 'red')
        this.volumeValue = new Text(
            `${Sound.getVolume().toFixed(0)}`,
            350,
            210,
            `35px Comic Sans MS`,
            'center',
            'black'
        )
        this.background = new Background([SETTING_BACKGROUND], 0, 700, 400)
        this.plusBtn = new Button('+', 385, 175, 50, 50)
        this.minusBtn = new Button('-', 265, 175, 50, 50)
        this.exitBtn = new Button('Exit', 250, 255, 200, 50)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public update(deltaTime: number): void {
        this.tRex.update(deltaTime)

        const mouseHoverCoord = this.input.getMouseHoverCoord()
        const x = mouseHoverCoord.getX()
        const y = mouseHoverCoord.getY()
        this.plusBtn.isHovered(x, y)
        this.minusBtn.isHovered(x, y)
        this.exitBtn.isHovered(x, y)

        if (this.input.isMouseDown()) {
            const mouseCoord = this.input.getMouseCoord()
            if (this.plusBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                Sound.setVolume(Sound.getVolume() + 0.1)
            } else if (this.minusBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                Sound.setVolume(Sound.getVolume() - 0.1)
            } else if (this.exitBtn.isClicked(mouseCoord.getX(), mouseCoord.getY())) {
                SceneManager.setNextScene('GameStartScene')
            }
        } else if (this.input.isTouchDown()) {
            const touchCoord = this.input.getTouchCoord()
            if (this.plusBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                Sound.setVolume(Sound.getVolume() + 0.1)
            } else if (this.minusBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                Sound.setVolume(Sound.getVolume() - 0.1)
            } else if (this.exitBtn.isClicked(touchCoord.getX(), touchCoord.getY())) {
                SceneManager.setNextScene('GameStartScene')
            }
        }
        this.volumeValue.setContent(`${Sound.getVolume().toFixed(0)}`)
    }

    public render(): void {
        
        Renderer.addToQueue(this.background, 0)
        Renderer.addToQueue(this.text, 5)
        Renderer.addToQueue(this.volumeValue, 5)
        Renderer.addToQueue(this.plusBtn, 5)
        Renderer.addToQueue(this.minusBtn, 5)
        Renderer.addToQueue(this.exitBtn, 5)
        Renderer.addToQueue(this.tRex, 5)
        
    }
}

export default GameSettingScene
*/