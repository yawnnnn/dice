export class Random {
    public roll(sides: number): number {
        return Math.floor(Math.random() * Number(sides)) + 1;
    }
}