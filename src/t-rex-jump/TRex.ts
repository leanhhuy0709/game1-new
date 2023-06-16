import GameObject from '../engine/game-objects/GameObject'
import Body from '../engine/physics/Body'
import Rectangle from '../engine/shape/Rectangle'
import Sound from '../engine/sound/Sound'
import Sprite from '../engine/sprite/Sprite'

const LAND = 350

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

class TRex extends GameObject {
    private jumpSprites: Sprite
    private fallSprites: Sprite
    private duckSprites: Sprite
    private jumpSfx: Sound
    private fallSfx: Sound
    private isDuck: boolean

    public constructor(delay: number, x = 0, y = 0, w = 0, h = 0) {
        super(
            new Rectangle(x, y, w, h, 'TRex'),
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
            delay
        )

        let sprites = [
            DINOSAUR_1,
            DINOSAUR_2,
            DINOSAUR_3,
            DINOSAUR_4,
            DINOSAUR_5,
            DINOSAUR_6,
            DINOSAUR_7,
            DINOSAUR_8,
        ]

        this.jumpSprites = new Sprite(sprites, delay)

        sprites = [DINOSAUR_8, DINOSAUR_8, DINOSAUR_9, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12]

        this.fallSprites = new Sprite(sprites, delay)

        sprites = [DINOSAUR_DUCK_1, DINOSAUR_DUCK_2]

        this.duckSprites = new Sprite(sprites, delay * 2)

        this.jumpSfx = new Sound('assets/sound/jump_sfx.mp3')
        this.fallSfx = new Sound('assets/sound/fall_sfx.wav')
    }

    public update(deltaTime: number) {
        super.update(deltaTime)

        if (this.isJump()) {
            this.fallSprites.setIdx(0)
            if (this.jumpSprites.getIdx() + 1 < this.jumpSprites.getLength())
                this.jumpSprites.goToNext(deltaTime)
        } else if (this.isFall()) {
            this.jumpSprites.setIdx(0)
            if (this.fallSprites.getIdx() + 1 < this.fallSprites.getLength())
                this.fallSprites.goToNext(deltaTime)
        } else {
            this.fallSprites.setIdx(0)
            this.jumpSprites.setIdx(0)

            if (this.isDuck) this.duckSprites.goToNext(deltaTime)
            else this.getSprite().goToNext(deltaTime)
        }
    }
    //fix
    public render(): void {
        //this.getShape().render()
        const rect = this.getShape() as Rectangle
        
        if (this.isJump()) {
            this.jumpSprites.render(
                rect.getCoord().getX(),
                rect.getCoord().getY(),
                rect.getSize().getWidth(),
                rect.getSize().getHeight()
            )
        } else if (this.isFall()) {
            if (rect.getHighestY() + 30 > LAND) this.fallSfx.play()
            if (rect.getHighestY() + 50 > LAND) {
                this.fallSprites.setIdx(this.fallSprites.getLength() - 1)
                this.fallSprites.setDelay(0)
                this.fallSprites.render(
                    rect.getCoord().getX(),
                    rect.getCoord().getY(),
                    rect.getSize().getWidth(),
                    rect.getSize().getHeight()
                )
            } else {
                this.fallSprites.render(
                    rect.getCoord().getX(),
                    rect.getCoord().getY(),
                    rect.getSize().getWidth(),
                    rect.getSize().getHeight()
                )
            }
        } else {
            if (this.isDuck) {
                this.duckSprites.render(
                    rect.getCoord().getX(),
                    rect.getCoord().getY(),
                    rect.getSize().getWidth(),
                    rect.getSize().getHeight()
                )
            } else super.render()
        }
    }

    public jump(): void {
        if (this.isJump() || this.isFall()) return
        this.updatePrevY()
        this.setStartSpeed(2.5)
        this.jumpSfx.play()
    }

    public fall(): void {
        this.updatePrevY()
        this.setStartSpeed(0)
    }

    public duck(): void {
        this.isDuck = true
        const rect = this.getShape() as Rectangle
        rect.getSize().setHeight(0.8 * 100)
        rect.getCoord().setY(270)
    }

    public move(): void {
        this.isDuck = false
        const rect = this.getShape() as Rectangle
        rect.getSize().setHeight(100)
        //rect.getCoord().setY(250)
    }
}

export default TRex
