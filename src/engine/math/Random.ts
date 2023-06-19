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
        arr.sort((_a, _b) => Math.random())
    }
}