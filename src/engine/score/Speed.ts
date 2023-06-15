export default class Speed
{
    private static speed: number
    private static defaulSpeed: number

    public static init(speed: number)
    {
        Speed.speed = speed
        Speed.defaulSpeed = speed
    }

    public static getSpeed(): number
    {
        return Speed.speed
    }

    public static getDefaultSpeed(): number 
    {
        return Speed.defaulSpeed
    }

    public static add(coeff: number)
    {
        Speed.speed += coeff
    }
}