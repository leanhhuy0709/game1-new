export default class Random 
{
    public static getIntNumber(st: number, ed: number)
    {
        //[st, ed)
        return Math.floor(Math.random() * (ed - st) + st)
    }

    public static getNumber(st: number, ed: number)
    {
        return Math.random() * (ed - st) + st
    }

    public static shuffle(arr: number[])
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        arr.sort((a, b) => Math.random())
    }
}