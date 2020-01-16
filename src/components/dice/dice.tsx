import React from 'react';

interface IProps {
    sides: number;
    onClick: any;
};
interface IState {};

export default class DiceComponent extends React.Component<IProps, IState> {
    render () {
        return (
            <button onClick={() => this.props.onClick()}>{this.props.sides}</button>
        );
    }
}
