import React from 'react';
import DiceComponent from './dice';
import { Random } from '../../global/random';
import { RollHistory } from '../../model/history';
import { DiceUtil } from '../../global/dice-util';

interface IProps {
    dice: {[key: string]: number};
    onRoll: (h: RollHistory) => void;
    onClear: (obj: any) => void;
};
interface IState {
    selected: {[key: string]: number};
    selectedString: string;
    rolled: Array<number>;
    isCritical: boolean;
};

export default class DiceMainComponent extends React.Component<IProps, IState> {
    diceUtil = new DiceUtil();
    state: IState = {
        selected: {},
        selectedString: '',
        rolled: [],
        isCritical: false
    };

    componentDidUpdate (prevProps: IProps, prevState: IState) {
        if (JSON.stringify(prevProps.dice) !== JSON.stringify(this.props.dice)) {
            this.setState({
                selected: this.props.dice,
                selectedString: this.diceUtil.parseDiceObject(this.props.dice)
            });
        }
    }
    
    select (sides: number) {
        let obj: {[key: string]: number} = JSON.parse(JSON.stringify(this.state.selected));
        let sSides = sides.toString();
        obj[sSides] = obj[sSides] ? obj[sSides] + 1 : 1;
        let diceString = this.diceUtil.parseDiceObject(obj);
        this.setState({ selected: obj, selectedString: diceString });
    }

    roll () {
        let rolled = [];
        let obj = this.state.selected;

        if (Object.keys(obj).length > 0) {
            for (const prop in obj) {
                if (prop !== '0') {
                    let numDice = !this.state.isCritical ? obj[prop] : obj[prop] * 2;
                    for (let i = 0; i < numDice; i++) {
                        let x = new Random().roll(Number(prop));
                        rolled.push(x);
                    }
                }
            }

            // Tack on straight number values at the end.
            if (obj.hasOwnProperty('0')) { rolled.push(obj['0']); }
    
            this.setState({ rolled: rolled, isCritical: false });
    
            let h = new RollHistory();
            h.id = 1;
            h.diceString = this.state.isCritical ? this.diceUtil.createCriticalDiceString(this.state.selectedString.slice(0)) : this.state.selectedString;
            h.total = rolled.reduce((a, v) => a + v, 0);
            h.dateTime = new Date(Date.now()).valueOf();
            h.isCritical = this.state.isCritical;
            this.props.onRoll(h);
        }
    }

    clear () {
        this.setState({
            selected: {},
            selectedString: '',
            rolled: []
        });

        this.props.onClear({});
    }

    changeSelectedString(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({selectedString: e.target.value});
    }

    blurSelectedString() {
        if (this.state.selectedString && this.state.selectedString !== '') {
            let obj = this.diceUtil.parseDiceString(this.state.selectedString.slice(0));
            this.setState({selected: obj});
        }
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
                    {this.state.rolled.length === 1 ? this.state.rolled[0] : null}
                    {this.state.rolled.length > 1 ? this.state.rolled.join(' + ') + ' = ' + this.state.rolled.reduce((a, v) => a + v, 0) : null}
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
