import { DEPTH } from '../../t-rex-jump/depth'
import Camera from '../camera/Camera'
import RenderComponent from '../component/RenderComponent'
import Text from '../component/Text'
import GameObject from '../game-objects/GameObject'

export default class Score extends RenderComponent {
    private score = 0
    private highScore = 0
    private scoreText: Text 
    private highScoreText: Text

    public constructor(obj: GameObject)
    {
        super(obj, DEPTH.OBJECT_LOW)
        //this.scoreText = new Text(this)
    }

    public getScore(): number {
        return this.score
    }

    public getHighScore(): number {
        return this.highScore
    }

    public addWithDeltaTime(deltaTime: number, coeff: number): void {
        this.score += deltaTime * coeff
        this.highScore = this.highScore > this.score ? this.highScore : this.score
        this.scoreText.setContent(this.score.toFixed(0))
        this.highScoreText.setContent(this.highScore.toFixed(0))
    }

    public add(coeff: number): void {
        this.score += coeff
        this.highScore = this.highScore > this.score ? this.highScore : this.score
        this.scoreText.setContent(this.score.toFixed(0))
        this.highScoreText.setContent(this.highScore.toFixed(0))
    }

    public resetScore(): void {
        this.score = 0
    }

    public resetHighScore(): void {
        this.highScore = 0
    }

    public getScoreText(): Text {
        return this.scoreText
    }

    public getHighScoreText(): Text {
        return this.highScoreText
    }

    public render(camera = new Camera()): void {
        if (!this.isActive) return
        this.scoreText.render(camera)
        this.highScoreText.render(camera)
    }

    public update(deltaTime: number): void {
        this.addWithDeltaTime(deltaTime, 5)
    }
}


