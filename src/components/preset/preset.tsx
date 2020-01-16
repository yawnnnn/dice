import React from 'react';
import { Preset } from '../../model/preset';

interface IProps {
    preset: Preset;
    onClick: (obj: any) => void
};
interface IState {
    name: string,
    diceString: string
};

export default class PresetComponent extends React.Component<IProps, IState> {
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

    render () {
        return (
            <div>
                <span>{this.state.name}</span>
                <span>{this.state.diceString}</span>
                <button onClick={() => this.props.onClick(this.parseDiceString())}>Use</button>
            </div>
        );
    }
}
