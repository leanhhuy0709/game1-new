//import Button from '../component/Button'
import Game from '../engine/Game'
import Loader from '../engine/loader/Loader'
import SceneManager from '../engine/scene/SceneManager'
import GameOverScene from './GameOverScene'
import GamePlayScene from './GamePlayScene'
import GameSettingScene from './GameSettingScene'
import GameStartScene from './GameStartScene'
import {
    CACTUS,
    CLOUD,
    CLOUD_BACKGROUND,
    DINOSAUR_1,
    DINOSAUR_10,
    DINOSAUR_11,
    DINOSAUR_12,
    DINOSAUR_2,
    DINOSAUR_3,
    DINOSAUR_4,
    DINOSAUR_5,
    DINOSAUR_6,
    DINOSAUR_7,
    DINOSAUR_8,
    DINOSAUR_9,
    DINOSAUR_DUCK_1,
    DINOSAUR_DUCK_2,
    DINOSAUR_MOVE_1,
    DINOSAUR_MOVE_2,
    DINOSAUR_MOVE_3,
    DINOSAUR_MOVE_4,
    DINOSAUR_MOVE_5,
    DINOSAUR_MOVE_6,
    DINOSAUR_MOVE_7,
    DINOSAUR_MOVE_8,
    FLYDINO_1,
    FLYDINO_2,
    FLYDINO_3,
    GAMEOVER_BACKGROUND,
    GROUND,
    MOUTAIN,
    SETTING_BACKGROUND,
    START_BACKGROUND,
} from './const'

class TRexJump extends Game {
    private sceneManager: SceneManager

    public constructor() {
        super(700, 400)
        this.sceneManager = new SceneManager(new GameStartScene(this.sceneManager))
        this.sceneManager.setNewScene(new GameStartScene(this.sceneManager))

        Loader.loadAllImages([
            DINOSAUR_MOVE_1,
            DINOSAUR_MOVE_2,
            DINOSAUR_MOVE_3,
            DINOSAUR_MOVE_4,
            DINOSAUR_MOVE_5,
            DINOSAUR_MOVE_6,
            DINOSAUR_MOVE_7,
            DINOSAUR_MOVE_8,
            DINOSAUR_1,
            DINOSAUR_2,
            DINOSAUR_3,
            DINOSAUR_4,
            DINOSAUR_5,
            DINOSAUR_6,
            DINOSAUR_7,
            DINOSAUR_8,
            DINOSAUR_9,
            DINOSAUR_10,
            DINOSAUR_11,
            DINOSAUR_12,
            DINOSAUR_DUCK_1,
            DINOSAUR_DUCK_2,
            FLYDINO_1,
            FLYDINO_2,
            FLYDINO_3,
            CACTUS,
            GAMEOVER_BACKGROUND,
            START_BACKGROUND,
            CLOUD_BACKGROUND,
            GROUND,
            MOUTAIN,
            SETTING_BACKGROUND,
            CLOUD,
        ])
    }

    public start(): void {
        //
        super.start()
        this.update(Date.now())
    }

    public update(lastTime: number): void {
        let currTime = Date.now()
        const deltaTime = (currTime - lastTime) / 10

        if (Loader.isLoadComplete()) {
            this.sceneManager.getScene().update(deltaTime)
            this.sceneManager.getScene().render()
            
            if (this.sceneManager.isNeedToChangeScene()) {
                switch (this.sceneManager.getNextScene()) {
                    case 'GamePlayScene':
                        
                        this.sceneManager.setNewScene(new GamePlayScene(this.sceneManager))
                        break
                        
                    case 'GameOverScene':
                        this.sceneManager.setNewScene(new GameOverScene(this.sceneManager))
                        break
                    
                    case 'GameStartScene':
                        this.sceneManager.setNewScene(new GameStartScene(this.sceneManager))
                        break
                        
                    case 'GameSettingScene':
                        this.sceneManager.setNewScene(new GameSettingScene(this.sceneManager))
                        break
                }
            }
        }

        currTime = Date.now()
        super.update(currTime)
    }
}

const g = new TRexJump()
g.start()

export default TRexJump
