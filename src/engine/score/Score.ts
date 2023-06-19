export default class Score {
    private static score = 0
    private static highScore = 0
    private static level = 1

    public static getScore(): number {
        return this.score
    }

    public static getHighScore(): number {
        return this.highScore
    }

    public static addWithDeltaTime(deltaTime: number, coeff: number): void {
        Score.score += deltaTime * coeff
        Score.highScore = this.highScore > this.score ? this.highScore : this.score
    }

    public static add(coeff: number): void {
        this.score += coeff
        this.highScore = this.highScore > this.score ? this.highScore : this.score
    }

    public static resetScore(): void {
        this.score = 0
    }

    public static resetHighScore(): void {
        this.highScore = 0
    }

    public static setLevel(level: number): void {
        this.level = level
    }

    public static getLevel(): number {
        return this.level
    }
    public static resetLevel(): void {
        this.level = 1
    }
}
