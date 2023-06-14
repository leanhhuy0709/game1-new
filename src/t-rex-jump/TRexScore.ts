import Score, { GAME_SPEED_DEFAULT } from '../engine/Score'

class TRexScore extends Score {
    private static level = 100

    public static reset(): void {
        TRexScore.setGameSpeed(GAME_SPEED_DEFAULT)
        TRexScore.level = 100
        TRexScore.resetScore()
    }

    public static addWithDeltaTime(deltaTime: number, coeff: number): void {
        Score.addWithDeltaTime(deltaTime, coeff * (TRexScore.gameSpeed / GAME_SPEED_DEFAULT))
    }

    public static updateLevel(): void {
        if (TRexScore.getScore() > TRexScore.level) {
            TRexScore.level += 300
            TRexScore.addGameSpeed(2)
        }
    }
}

export default TRexScore
