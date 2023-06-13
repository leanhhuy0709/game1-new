import Score from '../engine/Score'

export const GAME_SPEED_DEFAULT = 5

class TRexScore extends Score {
    private static gameSpeed = GAME_SPEED_DEFAULT

    public static getGameSpeed(): number {
        return TRexScore.gameSpeed
    }

    public static setGameSpeed(gameSpeed: number): void {
        TRexScore.gameSpeed = gameSpeed
    }

    public static addGameSpeed(coeff: number): void {
        TRexScore.gameSpeed += coeff
    }

    public static resetGameSpeed(): void {
        TRexScore.gameSpeed = GAME_SPEED_DEFAULT
    }

    public static reset(): void {
        TRexScore.gameSpeed = GAME_SPEED_DEFAULT
        TRexScore.resetScore()
    }

    public static addWithDeltaTime(deltaTime: number, coeff: number): void {
        Score.addWithDeltaTime(deltaTime, coeff * (TRexScore.gameSpeed / GAME_SPEED_DEFAULT))
    }
}

export default TRexScore
