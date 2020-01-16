export class RollHistory {
    public id: number;
    public diceString: string;
    public total: number;
    public dateTime: number;

    constructor () {
        this.id = 0;
        this.diceString = '';
        this.total = 0;
        this.dateTime = new Date(2020, 0, 1).valueOf();
    }
}