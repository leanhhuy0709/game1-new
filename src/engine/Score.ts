import Renderable from '../component/Renderable'
import Text from '../component/Text'

class Score extends Renderable {
    private static score = 0
    private static highScore = 0
    private static scoreText: Text = new Text('0', 0, 0, '30px Cambria', 'start')
    private static highScoreText: Text = new Text('0', 0, 0, '30px Cambria', 'start')

    public static getScore(): number {
        return Score.score
    }

    public static getHighScore(): number {
        return Score.highScore
    }

    public static addWithDeltaTime(deltaTime: number, coeff: number): void {
        Score.score += deltaTime * coeff
        Score.highScore = Score.highScore > Score.score ? Score.highScore : Score.score
        Score.scoreText.setContent(Score.score.toFixed(0))
        Score.highScoreText.setContent(Score.highScore.toFixed(0))
    }

    public static add(coeff: number): void {
        Score.score += coeff
        Score.highScore = Score.highScore > Score.score ? Score.highScore : Score.score
        Score.scoreText.setContent(Score.score.toFixed(0))
        Score.highScoreText.setContent(Score.highScore.toFixed(0))
    }

    public static resetScore(): void {
        Score.score = 0
    }

    public static resetHighScore(): void {
        Score.highScore = 0
    }

    public static showScore(x: number, y: number) {
        Score.scoreText.setContent(Score.score.toFixed(0).toString())
        Score.scoreText.setCoord(x, y)
        Score.scoreText.render()
    }

    public static showHighScore(x: number, y: number) {
        Score.highScoreText.setContent('HighScore: ' + Score.highScore.toFixed(0).toString())
        Score.highScoreText.setCoord(x, y)
        Score.highScoreText.render()
    }

    public static getScoreText(): Text {
        return Score.scoreText
    }

    public static getHighScoreText(): Text {
        return Score.highScoreText
    }
}

export default Score
