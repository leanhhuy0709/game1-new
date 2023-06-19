import Sprite from '../engine/component/Sprite'
import Body from '../engine/component/physics/Body'
import Collider from '../engine/component/physics/Collider'
import GameObject from '../engine/game-objects/GameObject'
import { DEPTH } from './depth'

import {
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
} from './const'
import SpriteNoReset from '../engine/component/SpriteNoReset'

class TRex extends GameObject {
    private minJump: number
    private checkMinJump: boolean
    private defaultSpeed: number

    public constructor(x = 0, y = 0, w = 0, h = 0, speed = 1) {
        super(x, y, w, h)
        this.addComponent(new Body(this, speed, 1, 0))
        this.addComponent(new Collider(this))
        this.addComponent(
            new Sprite(
                this,
                [
                    DINOSAUR_MOVE_1,
                    DINOSAUR_MOVE_2,
                    DINOSAUR_MOVE_3,
                    DINOSAUR_MOVE_4,
                    DINOSAUR_MOVE_5,
                    DINOSAUR_MOVE_6,
                    DINOSAUR_MOVE_7,
                    DINOSAUR_MOVE_8,
                ],
                10,
                DEPTH.OBJECT_HIGH
            )
        )

        this.addComponent(
            new SpriteNoReset(
                this,
                [
                    DINOSAUR_1,
                    DINOSAUR_2,
                    DINOSAUR_3,
                    DINOSAUR_4,
                    DINOSAUR_5,
                    DINOSAUR_6,
                    DINOSAUR_7,
                    DINOSAUR_8,
                ],
                20,
                DEPTH.OBJECT_HIGH
            )
        )

        this.addComponent(
            new SpriteNoReset(
                this,
                [DINOSAUR_8, DINOSAUR_8, DINOSAUR_9, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12],
                20,
                DEPTH.OBJECT_HIGH
            )
        )

        this.addComponent(
            new Sprite(this, [DINOSAUR_DUCK_1, DINOSAUR_DUCK_2], 10, DEPTH.OBJECT_HIGH)
        )

        this.minJump = 0
        this.checkMinJump = false
        this.defaultSpeed = speed
        //this.jumpSfx = new Sound('assets/sound/jump_sfx.mp3')
        //this.fallSfx = new Sound('assets/sound/fall_sfx.wav')
    }

    public update(deltaTime: number) {
        super.update(deltaTime)

        //update sprite loading
        const spriteList = this.getComponent<Sprite>(Sprite)
        const moveSprite = spriteList[0]
        const jumpSprite = spriteList[1]
        const fallSprite = spriteList[2]
        const duckSprite = spriteList[3]

        const body = this.getComponent<Body>(Body)[0]
        //don't duck at this time
        if (Math.abs(body.getVelocity().getMagnitudeY()) < 0.05) {
            moveSprite.setIsAcitve(true)
            duckSprite.setIsAcitve(false)
            jumpSprite.setIsAcitve(false)
            fallSprite.setIsAcitve(false)
        } else if (body.getVelocity().getMagnitudeY() < 0) {
            moveSprite.setIsAcitve(false)
            duckSprite.setIsAcitve(false)
            jumpSprite.setIdx(0)
            jumpSprite.setIsAcitve(true)
            fallSprite.setIsAcitve(false)
        } else if (body.getVelocity().getMagnitudeY() > 0) {
            moveSprite.setIsAcitve(false)
            duckSprite.setIsAcitve(false)
            jumpSprite.setIsAcitve(false)
            fallSprite.setIdx(0)
            fallSprite.setIsAcitve(true)
        }

        if (this.checkMinJump) this.minJump += 1.5 * deltaTime
    }

    public jump(): void {
        const body = this.getComponent<Body>(Body)[0]
        if (Math.abs(body.getVelocity().getMagnitudeY()) == 0) {
            this.minJump = 0
            this.checkMinJump = true
            body.addVeloctity(3, 0, -1)
        }
        if (this.getY() <= 0) this.fall()
    }

    public fall(): void {
        const body = this.getComponent<Body>(Body)[0]
        if (body.getVelocity().getMagnitudeY() < 0) {
            body.setVelocity(this.defaultSpeed, 1, 0)
        }
    }

    public duck(): void {
        /*
        this.isDuck = true
        const rect = this.getShape() as Rectangle
        rect.getSize().setHeight(0.8 * 100)
        rect.getCoord().setY(270)
        */
    }

    public move(): void {
        /*
        this.isDuck = false
        const rect = this.getShape() as Rectangle
        rect.getSize().setHeight(100)
        */
        //rect.getCoord().setY(250)
    }

    public getMinJump(): number {
        return this.minJump
    }

    public getDefaultSpeed(): number {
        return this.defaultSpeed
    }

    public setDefaultSpeed(speed: number): void {
        this.defaultSpeed = speed
    }
}

export default TRex
