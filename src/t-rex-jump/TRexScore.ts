import Score from "../engine/score/Score"
import Speed from "../engine/score/Speed"

class TRexScore extends Score {
    private static level = 100

    public static reset(): void {
        TRexScore.level = 100
        TRexScore.resetScore()
    }

    public static addWithDeltaTime(deltaTime: number, coeff: number): void {
        Score.addWithDeltaTime(deltaTime, coeff * (Speed.getSpeed() / Speed.getDefaultSpeed()))
    }

    public static updateLevel(): void {
        if (TRexScore.getScore() > TRexScore.level) {
            TRexScore.level += 300
            Speed.add(0.1)
        }
    }
}

export default TRexScore
