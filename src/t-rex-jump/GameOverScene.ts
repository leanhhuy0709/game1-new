
import Background from '../engine/component/Background'
import Button from '../engine/component/Button'
import Text from '../engine/component/Text'
import GameObject from '../engine/game-objects/GameObject'
import Scene from '../engine/scene/Scene'

import { GAMEOVER_BACKGROUND } from './const'
import { DEPTH } from './depth'

export default class GameOverScene extends Scene {
    public constructor(cameraSpeed = 0) {
        super('GameOverScene', cameraSpeed)

        const textBox = new GameObject(350, 120, 0, 0)
        textBox.addComponent(new Text(textBox, DEPTH.OBJECT_MEDIUM, 'Game Over', '50px Comic Sans MS', 'center', '#713B61'))
        this.addObject(textBox)

        const bg = new GameObject(0, 0, 1000, 400)
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
        super.update(deltaTime)
    }
}

 GameOverScene
