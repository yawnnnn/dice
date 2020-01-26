export class DiceUtil {
    /**
     * Returns a dice object {'#': #, ...} from a dice string.
     * @param diceString Must be of the form '1d20 + 2d10 ...'
     */
    public parseDiceString(diceString: string): {[key: string]: number} {
        let obj: {[key: string]: number} = {};
        if (!diceString || diceString === '' || !this.isValidDiceString(diceString)) { return obj; }
        let selectedDiceArray = diceString.replace(' ', '').split('+');

        selectedDiceArray.forEach(dString => {
            let diceArray = dString.split('d'); // dString should be of the format #d# (e.g 2d6).
            if (diceArray.length === 2) {
                obj[diceArray[1].toString()] = Number(diceArray[0]);
            } else if (diceArray.length === 1) {
                obj['0'] = obj.hasOwnProperty('0') ? obj['0'] + Number(diceArray[0]) : Number(diceArray[0]);
            }
        });

        return obj;
    }

    public parseDiceObject(diceObj: {[key: string]: number}): string {
        let diceArray = Object.keys(diceObj).filter(key => key !== '0').map(key => diceObj[key] + 'd' + key);
        if (diceObj.hasOwnProperty('0')) { diceArray.push(diceObj['0'].toString()); }
        return diceArray.join(' + ');
    }

    public createCriticalDiceString(diceString: string): string {
        let critString = '';
        if (!diceString || diceString === '') { return critString; } // TODO: Add more validation.
        let selectedDiceArray = diceString.replace(' ', '').split('+');

        return selectedDiceArray.map(dString => {
            let diceArray = dString.split('d'); // dString should be of the format #d# (e.g 2d6).
            let string = '';
            let num = 0;

            if (diceArray.length === 2) {
                num = Number(diceArray[0]) * 2;
                string = num.toString() + 'd' + diceArray[1];
            } else if (diceArray.length === 1) {
                num = Number(diceArray[0]);
                string = num.toString();
            }
            return string;
        }).join(' + ');
    }

    public isValidDiceString(diceString: string): boolean {
        return /^[0-9d\s+]*$/.test(diceString);
    }
}