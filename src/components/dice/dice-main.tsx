import React from 'react';
import DiceComponent from './dice';
import { Random } from '../../global/random';
import { RollHistory } from '../../model/history';

interface IProps {
    dice: {[key: string]: number};
    onRoll: (h: RollHistory) => void;
    onClear: (obj: any) => void;
};
interface IState {
    selected: {[key: string]: number};
    selectedString: string;
    rolled: Array<number>;
    total: number;
    isCritical: boolean;
};

export default class DiceMainComponent extends React.Component<IProps, IState> {
    state: IState = {
        selected: {},
        selectedString: '',
        rolled: [],
        total: 0,
        isCritical: false
    };

    componentDidUpdate (prevProps: IProps, prevState: IState) {
        if (JSON.stringify(prevProps.dice) !== JSON.stringify(this.props.dice)) {
            this.setState({
                selected: this.props.dice,
                selectedString: this.parseDiceObj(this.props.dice)
            });
        }
    }
    
    select (sides: number) {
        let obj = this.state.selected;
        let property = sides.toString();
        obj[property] = obj[property] ? obj[property] + 1 : 1;

        let selectedArray = [];
        for (const prop in obj) {
            let string = obj[prop].toString() + 'd' + prop;
            selectedArray.push(string);
        }
        let selectedString = selectedArray.join(' + ')

        this.setState({ selected: obj, selectedString: selectedString });
    }

    roll () {
        let rolled = [];
        let total = 0;
        let obj = this.state.selected;

        if (Object.keys(obj).length > 0) {
            for (const prop in obj) {
                let numDice = !this.state.isCritical ? obj[prop] : obj[prop] * 2;
                for (let i = 0; i < numDice; i++) {
                    let x = new Random().roll(Number(prop));
                    rolled.push(x);
                    total += x;
                }
            }
    
            this.setState({ rolled: rolled, total: total });
    
            let h = new RollHistory();
            h.id = 1;
            h.diceString = this.generateFinalDiceString();
            h.total = total;
            h.dateTime = new Date(Date.now()).valueOf();
            h.isCritical = this.state.isCritical;
            this.props.onRoll(h);
        }
    }

    clear () {
        this.setState({
            selected: {},
            selectedString: '',
            rolled: [],
            total: 0
        });

        this.props.onClear({});
    }

    changeSelectedString(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({selectedString: e.target.value});
    }

    blurSelectedString() {
        // TODO: Make the validation here more robust.
        if (this.state.selectedString !== '') {
            let obj: {[key: string]: number} = {};
            let x = this.state.selectedString.slice(0);
            x = x.replace(' ', ''); // Remove spaces.
            let stringArray = x.split('+');

            stringArray.forEach(diceString => {
                let diceArray = diceString.split('d');
                let num = Number(diceArray[0]);
                let sides = diceArray[1];
                obj[sides.toString()] = num;
            });

            this.setState({selected: obj});
        }
    }

    generateFinalDiceString (): string {
        let s = '';

        if (this.state.isCritical) {
            let x = this.state.selectedString.slice(0);
            x = x.replace(' ', ''); // Remove spaces.
            let stringArray = x.split('+');
            let newArray: Array<string> = [];

            stringArray.forEach(diceString => {
                let diceArray = diceString.split('d');
                let num = Number(diceArray[0]) * 2;
                let sides = diceArray[1];
                newArray.push(num.toString() + 'd' + sides);
            });

            s = newArray.join(' + ');
        } else {
            s = this.state.selectedString;
        }

        return s;
    }

    parseDiceObj (dice: any): string {
        let a = [];

        for (const prop in dice) {
            let string = dice[prop].toString() + 'd' + prop;
            a.push(string);
        }
        return a.join(' + ');
    }

    toggleCritical () {
        this.setState({ isCritical: !this.state.isCritical });
    }

    renderDice (sides: number) {
        return <DiceComponent sides={sides} onClick={() => this.select(sides)}></DiceComponent>
    }

    render () {
        return (
            <React.Fragment>
                <div className="results p-lg m-b-md">
                    {this.state.rolled.length === 1 ? this.state.total : null}
                    {this.state.rolled.length > 1 ? this.state.rolled.join(' + ') + ' = ' + this.state.total : null}
                </div>
                <div>
                    <div className="m-b">
                        <span className="m-r-sm">{this.renderDice(4)}</span>
                        <span className="m-r-sm">{this.renderDice(6)}</span>
                        <span className="m-r-sm">{this.renderDice(8)}</span>
                        <span className="m-r-sm">{this.renderDice(10)}</span>
                        <span className="m-r-sm">{this.renderDice(20)}</span>
                        <span >{this.renderDice(100)}</span>
                    </div>
                    <div className="m-b d-flex flex-row align-items-center">
                        <div className="flex-1 m-r">
                            <input 
                                className="text-center form-control m-r-sm" 
                                value={this.state.selectedString} 
                                onChange={(e) => this.changeSelectedString(e)} 
                                onBlur={() => this.blurSelectedString()}>
                            </input>
                        </div>
                        
                        <input type="checkbox" checked={this.state.isCritical} onChange={() => this.toggleCritical()}></input>
                    </div>
                    <div>
                        <span className="m-r-sm"><button className="btn btn-outline-dark" onClick={() => this.clear()}>Clear</button></span>
                        <button className="btn btn-outline-dark" onClick={() => this.roll()}>Roll</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
