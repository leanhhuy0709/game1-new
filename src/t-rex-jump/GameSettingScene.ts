import Button from '../component/Button'
import Text from '../component/Text'
import Renderer from '../engine/Renderer'
import Scene from '../engine/Scene'
import SceneManager from '../engine/SceneManager'
import Sound from '../engine/Sound'
import Background from './Background'
import TRex from './TRex'

const BACKGROUND = 'assets/background/5.png'

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
        this.background = new Background([BACKGROUND, BACKGROUND], 0, 700, 400)
        this.plusBtn = new Button('+', 410, 200, 50, 50)
        this.minusBtn = new Button('-', 290, 200, 50, 50)
        this.exitBtn = new Button('Exit', 350, 280, 200, 50)
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
