import React from 'react';
import { Preset } from '../../model/preset';

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

    delete (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.props.onDelete(this.props.index);
        e.preventDefault();
    }

    render () {
        return (
            <div className="list-group-item list-group-item-action">
                <div className="d-flex flex-row align-items-center">
                    <div className="flex-1 d-flex flex-row" onClick={() => this.props.onClick(this.parseDiceString())}>
                        <span className="flex-1">{this.state.name}</span>
                        <span className="flex-1">{this.state.diceString}</span>
                    </div>
                    <span><button className="btn btn-outline-danger btn-sm" onClick={(e) => this.delete(e)}>Delete</button></span>
                </div>
            </div>
        );
    }
}
