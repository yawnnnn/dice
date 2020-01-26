import React from 'react';
import { Preset } from '../../model/preset';
import { DiceUtil } from '../../global/dice-util';

interface IProps {
    preset: Preset;
    index: number;
    onClick: (obj: any) => void;
    onDelete: (index: number) => void;
};
interface IState {
    name: string;
    diceString: string;
};

export default class PresetComponent extends React.Component<IProps, IState> {
    diceUtil = new DiceUtil();
    state: IState = {
        name: this.props.preset ? this.props.preset.name : '',
        diceString: this.props.preset ? this.props.preset.diceString : ''
    };

    changeName (e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: e.target.value});
    }

    changeDice (e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({diceString: e.target.value});
    }

    clickPreset() {
        this.props.onClick(this.diceUtil.parseDiceString(this.state.diceString));
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    }

    /*
    parseDiceString (): any {
        let obj: {[key: string]: number} = {};

        if (this.state.diceString !== '') {
            let x = this.state.diceString;
            x = x.replace(' ', ''); // Remove spaces.
            let stringArray = x.split('+');

            stringArray.forEach(diceString => {
                let diceArray = diceString.split('d');
                let num = Number(diceArray[0]);
                let sides = diceArray[1];
                obj[sides.toString()] = num;
            });
        }

        return obj;
    }
    */

    delete (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.props.onDelete(this.props.index);
        e.preventDefault();
    }

    render () {
        return (
            <div className="list-group-item">
                <div className="d-flex flex-row align-items-center">
                    <div className="flex-1 d-flex flex-row" onClick={() => this.clickPreset()}>
                        <span className="flex-1">{this.state.name}</span>
                        <span className="flex-1">{this.state.diceString}</span>
                    </div>
                    <span><button className="btn btn-outline-danger btn-sm" onClick={(e) => this.delete(e)}>Delete</button></span>
                </div>
            </div>
        );
    }
}
