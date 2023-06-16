import Component from '../component/Component'
import Text from '../component/Text'
import GameObject from '../game-objects/GameObject'

export default class Score extends Component {
    private score = 0
    private highScore = 0
    private scoreText: Text 
    private highScoreText: Text

    public constructor(obj: GameObject)
    {
        super(obj)
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
}


