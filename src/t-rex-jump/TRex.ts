import Picture from '../engine/component/Picture'
import Body, { LAND } from '../engine/Body'
import Sound from '../engine/Sound'
import Sprite from '../engine/Sprite'
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

class TRex extends Body {
    private jumpSprites: Sprite
    private fallSprites: Sprite
    private duckSprites: Sprite
    private jumpSfx: Sound
    private fallSfx: Sound
    private isDuck: boolean

    public constructor(delay: number, x = 0, y = 0, w = 0, h = 0) {
        super(
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
            delay,
            x,
            y,
            w,
            h
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
        let tmp = []
        for (let i = 0; i < sprites.length; i++) {
            tmp.push(new Picture(sprites[i], x, y, w, h))
        }

        this.jumpSprites = new Sprite(tmp, delay)

        sprites = [DINOSAUR_8, DINOSAUR_8, DINOSAUR_9, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12]
        tmp = []
        for (let i = 0; i < sprites.length; i++) {
            tmp.push(new Picture(sprites[i], x, y, w, h))
        }

        this.fallSprites = new Sprite(tmp, delay)

        sprites = [DINOSAUR_DUCK_1, DINOSAUR_DUCK_2]
        tmp = []
        for (let i = 0; i < sprites.length; i++) {
            tmp.push(new Picture(sprites[i], x, y, w * 1.2, h * 0.8))
        }

        this.duckSprites = new Sprite(tmp, delay * 2)

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

    public render(): void {
        if (this.isJump()) {
            this.jumpSprites.setCoord(
                this.getCoord().getX(),
                this.getCoord().getY() - this.jumpSprites.getCurrent().getSize().getHeight()
            )
            this.jumpSprites.render()
        } else if (this.isFall()) {
            if (this.getCoord().getY() + 30 > LAND) this.fallSfx.play()
            if (this.getCoord().getY() + 50 > LAND) {
                this.fallSprites.setIdx(this.fallSprites.getLength() - 1)
                this.fallSprites.setDelay(0)
                this.fallSprites.setCoord(
                    this.getCoord().getX(),
                    this.getCoord().getY() - this.fallSprites.getCurrent().getSize().getHeight()
                )
                this.fallSprites.render()
            } else {
                this.fallSprites.setCoord(
                    this.getCoord().getX(),
                    this.getCoord().getY() - this.fallSprites.getCurrent().getSize().getHeight()
                )
                this.fallSprites.render()
            }
        } else {
            if (this.isDuck) {
                this.duckSprites.setCoord(
                    this.coord.getX(),
                    this.coord.getY() - this.duckSprites.getCurrent().getSize().getHeight() + 10
                )
                this.duckSprites.render()
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
        this.size.setHeight(0.8 * 100)
    }

    public move(): void {
        this.isDuck = false
        this.size.setHeight(100)
    }
}

export default TRex

/*
import Graphics from './Graphics'
import Sprite from './Sprite'
import TRexJump, { GAME_SPEED_DEFAULT } from './TRexJump'
import { TRexInterface } from './types/trex'

const DINOSAUR_1 = 'assets/dinosaur-sprites/Jump (1).png'
const DINOSAUR_2 = 'assets/dinosaur-sprites/Jump (2).png'
const DINOSAUR_3 = 'assets/dinosaur-sprites/Jump (3).png'
const DINOSAUR_4 = 'assets/dinosaur-sprites/Jump (4).png'
const DINOSAUR_5 = 'assets/dinosaur-sprites/Jump (5).png'
const DINOSAUR_6 = 'assets/dinosaur-sprites/Jump (6).png'
const DINOSAUR_7 = 'assets/dinosaur-sprites/Jump (7).png'
const DINOSAUR_8 = 'assets/dinosaur-sprites/Jump (8).png'
const DINOSAUR_9 = 'assets/dinosaur-sprites/Jump (9).png'
const DINOSAUR_10 = 'assets/dinosaur-sprites/Jump (10).png'
const DINOSAUR_11 = 'assets/dinosaur-sprites/Jump (11).png'
const DINOSAUR_12 = 'assets/dinosaur-sprites/Jump (12).png'

const DINOSAUR_MOVE_1 = 'assets/dinosaur-sprites/Run (1).png'
const DINOSAUR_MOVE_2 = 'assets/dinosaur-sprites/Run (2).png'
const DINOSAUR_MOVE_3 = 'assets/dinosaur-sprites/Run (3).png'
const DINOSAUR_MOVE_4 = 'assets/dinosaur-sprites/Run (4).png'
const DINOSAUR_MOVE_5 = 'assets/dinosaur-sprites/Run (5).png'
const DINOSAUR_MOVE_6 = 'assets/dinosaur-sprites/Run (6).png'
const DINOSAUR_MOVE_7 = 'assets/dinosaur-sprites/Run (7).png'
const DINOSAUR_MOVE_8 = 'assets/dinosaur-sprites/Run (8).png'

const DINOSAUR_DEAD_1 = 'assets/dinosaur-sprites/Dead (6).png'
const DINOSAUR_IDLE_1 = 'assets/dinosaur-sprites/Idle (1).png'
const DINOSAUR_DUCK_1 = 'assets/dinosaur-sprites/Duck (1).png'

const GRAVITY = 1

export enum TREX_STATE {
    MOVE = 1,
    JUMP,
    FALL,
    DEAD,
    IDLE,
    DUCK,
}
//TRex: compare (sprite, x, y, width, ...)
export default class TRex implements TRexInterface {
    private moveSprite: Sprite
    private jumpSprite: Sprite
    private fallSprite: Sprite
    private deadSprite: Sprite
    private idleSprite: Sprite
    private duckSprite: Sprite
    private width: number
    private widthDefault: number
    private height: number
    private heightDefault: number
    private x: number
    private xDefault: number
    private y: number
    private yDefault: number
    private jumpSize: number
    private jumpSizeDefault: number
    private state: TREX_STATE
    public constructor() {
        console.log('TRex created')
        this.moveSprite = new Sprite([
            DINOSAUR_MOVE_1,
            DINOSAUR_MOVE_2,
            DINOSAUR_MOVE_3,
            DINOSAUR_MOVE_4,
            DINOSAUR_MOVE_5,
            DINOSAUR_MOVE_6,
            DINOSAUR_MOVE_7,
            DINOSAUR_MOVE_8,
        ])
        this.jumpSprite = new Sprite([
            DINOSAUR_1,
            DINOSAUR_2,
            DINOSAUR_3,
            DINOSAUR_4,
            DINOSAUR_5,
            DINOSAUR_6,
            DINOSAUR_7,
            DINOSAUR_8,
        ]) //,
        this.fallSprite = new Sprite([DINOSAUR_9, DINOSAUR_10, DINOSAUR_11, DINOSAUR_12])
        this.deadSprite = new Sprite([DINOSAUR_DEAD_1])
        this.idleSprite = new Sprite([DINOSAUR_IDLE_1])
        this.duckSprite = new Sprite([DINOSAUR_DUCK_1])
        this.start()
    }
    public start() {
        this.xDefault = 10
        this.yDefault = 250
        this.jumpSizeDefault = 5
        this.widthDefault = 100
        this.heightDefault = 100

        this.width = this.widthDefault
        this.height = this.heightDefault
        this.x = this.xDefault
        this.y = this.yDefault
        this.jumpSize = this.jumpSizeDefault
        this.state = TREX_STATE.MOVE
    }
    public update(deltaTime: number) {
        switch (this.state) {
            case TREX_STATE.MOVE:
                this.move(deltaTime)
                break
            case TREX_STATE.JUMP:
                this.jump(deltaTime)
                break
            case TREX_STATE.FALL:
                this.fall(deltaTime)
                break
            case TREX_STATE.DEAD:
                this.dead()
                break
            case TREX_STATE.IDLE:
                this.idle()
                break
            case TREX_STATE.DUCK:
                this.duck()
                break
        }
    }
    public getX() {
        return this.x
    }
    public getY() {
        return this.y
    }
    public getWidth() {
        return this.width
    }
    public getHeight() {
        return this.height
    }
    public setX(x: number) {
        this.x = x
    }
    public setY(y: number) {
        this.y = y
    }
    public setWidth(width: number) {
        this.width = width
    }
    public setHeight(height: number) {
        this.height = height
    }
    public getState() {
        return this.state
    }
    public setState(state: TREX_STATE) {
        this.state = state
    }
    public getJumpSize() {
        return this.jumpSize
    }
    public setJumpSize(jumpSize: number) {
        this.jumpSize = jumpSize
    }
    public resetX() {
        this.x = this.xDefault
    }
    public resetY() {
        this.y = this.yDefault
    }
    public resetWidth() {
        this.width = this.widthDefault
    }
    public resetHeight() {
        this.height = this.heightDefault
    }
    public resetJumpSize() {
        this.jumpSize = this.jumpSizeDefault
    }
    public move(deltaTime: number) {
        this.resetX()
        this.resetY()
        this.resetWidth()
        this.resetHeight()
        this.resetJumpSize()
        this.fallSprite.setIdx(0)
        this.jumpSprite.setIdx(0)
        this.moveSprite.goToNext(deltaTime)
        Graphics.add(this.moveSprite.getCurrent(), this.x, this.y, this.width, this.height)
    }
    public jump(deltaTime: number) {
        this.resetWidth()
        this.resetHeight()
        //this.resetJumpSize()
        if (this.jumpSize > this.jumpSizeDefault) this.resetJumpSize()
        this.moveSprite.setIdx(0)
        this.fallSprite.setIdx(0)
        this.jumpSize = this.jumpSize - (GRAVITY * deltaTime) / 40
        this.y -= (this.jumpSize * deltaTime * TRexJump.getGameSpeed()) / GAME_SPEED_DEFAULT //- (1 / 2) * deltaTime * deltaTime * GRAVITY
        if (this.jumpSprite.getIdx() + 1 < this.jumpSprite.getLength())
            this.jumpSprite.goToNext(deltaTime)
        if (this.y <= 0) this.state = TREX_STATE.FALL
        Graphics.add(this.jumpSprite.getCurrent(), this.x, this.y, this.width, this.height)
    }
    public fall(deltaTime: number) {
        this.resetWidth()
        this.resetHeight()
        if (this.jumpSize < this.jumpSizeDefault) this.resetJumpSize()
        this.jumpSprite.setIdx(0)
        this.moveSprite.setIdx(0)
        this.jumpSize = this.jumpSize + GRAVITY * deltaTime
        this.y += ((this.jumpSize / 5) * deltaTime * TRexJump.getGameSpeed()) / GAME_SPEED_DEFAULT
        //
        if (this.fallSprite.getIdx() + 2 < this.fallSprite.getLength())
            this.fallSprite.goToNext(deltaTime)
        if (this.y + this.jumpSize * 10 >= this.yDefault)
            this.fallSprite.setIdx(this.fallSprite.getLength() - 2)
        if (this.y + this.jumpSize * 20 >= this.yDefault)
            this.fallSprite.setIdx(this.fallSprite.getLength() - 1)
        if (this.y >= this.yDefault) {
            this.y = this.yDefault
            this.state = TREX_STATE.MOVE
            this.fallSprite.setIdx(0)
        }
        Graphics.add(this.fallSprite.getCurrent(), this.x, this.y, this.width, this.height)
    }
    public dead() {
        this.width = (this.widthDefault * 4) / 3 - 10
        this.height = (this.heightDefault * 2) / 3 - 10
        this.y = this.heightDefault - this.height + 10 + this.yDefault
        Graphics.add(this.deadSprite.getCurrent(), this.x, this.y, this.width, this.height)
    }
    public idle() {
        this.resetY()
        Graphics.add(this.idleSprite.getCurrent(), this.x, this.y, this.width, this.height)
    }
    public duck() {
        this.resetJumpSize()
        this.width = (this.widthDefault * 4) / 3 - 10
        this.height = (this.heightDefault * 2) / 3 - 10
        this.y = this.heightDefault - this.height + 10 + this.yDefault
        Graphics.add(this.duckSprite.getCurrent(), this.x, this.y, this.width, this.height)
    }
}
 */
