export class DiceUtil {
    /**
     * Returns a dice object {'#': #, ...} from a dice string.
     * @param diceString Must be of the form '1d20 + 2d10 ...'
     */
    public parseDiceString(diceString: string): {[key: string]: number} {
        let obj: {[key: string]: number} = {};
        if (!diceString || diceString === '') { return obj; } // TODO: Add more validation.
        let selectedDiceArray = diceString.replace(' ', '').split('+');

        selectedDiceArray.forEach(dString => {
            let diceArray = dString.split('d'); // dString should be of the format #d# (e.g 2d6).
            obj[diceArray[1].toString()] = Number(diceArray[0]);
        });

        return obj;
    }

    public parseDiceObject(diceObj: {[key: string]: number}): string {
        return Object.keys(diceObj).map(key => diceObj[key] + 'd' + key).join(' + ' );
    }

    public createCriticalDiceString(diceString: string): string {
        let critString = '';
        if (!diceString || diceString === '') { return critString; } // TODO: Add more validation.
        let selectedDiceArray = diceString.replace(' ', '').split('+');

        return selectedDiceArray.map(dString => {
            let diceArray = dString.split('d'); // dString should be of the format #d# (e.g 2d6).
            let num = Number(diceArray[0]) * 2;
            return num.toString() + 'd' + diceArray[1];
        }).join(' + ');
    }
}