import React from 'react';
import DiceComponent from './dice';
import { Random } from '../../global/random';
import { RollHistory } from '../../model/history';

interface IProps {
    dice: {[key: string]: number};
    onRoll: (h: RollHistory) => void;
};
interface IState {
    selected: {[key: string]: number};
    selectedString: string;
    rolled: Array<number>;
    total: number;
};

export default class DiceMainComponent extends React.Component<IProps, IState> {
    state: IState = {
        selected: {},
        selectedString: '',
        rolled: [],
        total: 0
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
                for (let i = 0; i < obj[prop]; i++) {
                    let x = new Random().roll(Number(prop));
                    rolled.push(x);
                    total += x;
                }
            }
    
            this.setState({ rolled: rolled, total: total });
    
            let h = new RollHistory();
            h.id = 1;
            h.diceString = this.state.selectedString;
            h.total = total;
            h.dateTime = new Date(Date.now()).valueOf();
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
    }

    changeSelectedString(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({selectedString: e.target.value});
    }

    blurSelectedString() {
        // TODO: Make the validation here more robust.
        if (this.state.selectedString !== '') {
            let obj: {[key: string]: number} = {};
            let x = this.state.selectedString;
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

    parseDiceObj (dice: any): string {
        let a = [];

        for (const prop in dice) {
            let string = dice[prop].toString() + 'd' + prop;
            a.push(string);
        }
        return a.join(' + ');
    }

    renderDice (sides: number) {
        return <DiceComponent sides={sides} onClick={() => this.select(sides)}></DiceComponent>
    }

    render () {
        return (
            <div>
                <div className="results m-b-md">
                    {this.state.rolled.length === 1 ? this.state.total : null}
                    {this.state.rolled.length > 1 ? this.state.rolled.join(' + ') + ' = ' + this.state.total : null}
                </div>
                <div className="m-b">
                    <span className="m-r-sm">{this.renderDice(4)}</span>
                    <span className="m-r-sm">{this.renderDice(6)}</span>
                    <span className="m-r-sm">{this.renderDice(8)}</span>
                    <span className="m-r-sm">{this.renderDice(10)}</span>
                    <span className="m-r-sm">{this.renderDice(20)}</span>
                    <span className="m-r-sm">{this.renderDice(100)}</span>
                </div>
                <div className="m-b">
                    <input 
                        className="text-center" 
                        value={this.state.selectedString} 
                        onChange={(e) => this.changeSelectedString(e)} 
                        onBlur={() => this.blurSelectedString()}>
                    </input>
                </div>
                <div>
                    <span className="m-r-sm"><button onClick={() => this.clear()}>Clear</button></span>
                    <button onClick={() => this.roll()}>Roll</button>
                </div>
            </div>
        );
    }
}
