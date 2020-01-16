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
        let x = JSON.parse(JSON.stringify(this.state.presets));
        x.push(p);
        this.setState({ presets: x });

        localStorage.setItem('presets', JSON.stringify(x));
    }

    deletePreset () {

    }

    addHistory = (h: RollHistory) => {
        let x = this.state.history.splice(0);
        if (x.length === 5) { x.shift(); }
        x.push(h);
        this.setState({ history: x });

        localStorage.setItem('history', JSON.stringify(x));
    }

    render () {
        return (
            <div className="full-height d-flex flex-row p">
                <div className="card flex-2 d-flex align-items-center justify-content-center m-r">
                    <DiceMainComponent dice={this.state.dice} onRoll={this.addHistory}></DiceMainComponent>
                </div>
                <div className="d-flex flex-column flex-1">
                    <div className="card flex-1 m-b p-lg">
                        <PresetList presets={this.state.presets} onClick={this.updateDiceObj} onAdd={this.addPreset}></PresetList>
                    </div>
                    <div className="card flex-1 d-flex align-items-center justify-content-center p-lg">
                        <HistoryListComponent history={this.state.history}></HistoryListComponent>
                    </div>
                </div>
            </div>
        );
    }
}
