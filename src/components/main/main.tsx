import React from 'react';
import DiceMainComponent from '../dice/dice-main';
import PresetList from '../preset/preset-list';
import HistoryListComponent from '../history/history-list';
import { Preset } from '../../model/preset';
import { RollHistory } from '../../model/history';

interface IProps {};
interface IState {
    dice: {[key: string]: number},
    presets: Array<Preset>,
    history: Array<RollHistory>
};

export default class Main extends React.Component<IProps, IState> {
    state: IState = {
        dice: {},
        presets: JSON.parse(localStorage.getItem('presets') || "[]"),
        history: JSON.parse(localStorage.getItem('history') || "[]")
    };

    updateDiceObj = (obj: any) => {
        this.setState({ dice: obj });
    }

    addPreset = (p: Preset) => {
        let x = this.state.presets.slice(0);
        x.push(p);
        this.setState({ presets: x });

        localStorage.setItem('presets', JSON.stringify(x));
    }

    deletePreset = (index: number) => {
        let x = this.state.presets.slice(0);
        x.splice(index, 1);
        this.setState({ presets: x });
        localStorage.setItem('presets', JSON.stringify(x));
    }

    addHistory = (h: RollHistory) => {
        let x = this.state.history.splice(0);
        if (x.length === 5) { x.shift(); }
        x.unshift(h);
        this.setState({ history: x });

        localStorage.setItem('history', JSON.stringify(x));
    }

    render () {
        return (
            <div className="body">
                <div className="p-md">
                    <div className="row">
                        <div className="col-lg-8 full-height d-flex m-b-md">
                            <div className="card flex-1 d-flex align-items-center justify-content-center p-lg">
                                <DiceMainComponent dice={this.state.dice} onRoll={this.addHistory} onClear={this.updateDiceObj}></DiceMainComponent>
                            </div>
                        </div>
                        <div className="d-flex flex-column col-lg-4 m-b-md">
                            <div className="card flex-1 m-b-md p-lg">
                                <PresetList presets={this.state.presets} 
                                    onClick={this.updateDiceObj} 
                                    onAdd={this.addPreset} 
                                    onDelete={this.deletePreset}>
                                </PresetList>
                            </div>
                            <div className="card flex-1 p-lg">
                                <HistoryListComponent history={this.state.history}></HistoryListComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
