
import Background from '../engine/component/Background'
import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import GameObject from '../engine/game-objects/GameObject'
import Scene from '../engine/scene/Scene'
import TRex from './TRex'
import { SETTING_BACKGROUND } from './const'
import { DEPTH } from './depth'

export default class GameSettingScene extends Scene {
    public constructor(cameraSpeed = 0) {
        super('GameSettingScene', cameraSpeed)

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

        /*
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
        */
    }

    public update(deltaTime: number): void {
        super.update(deltaTime)
    }
}

