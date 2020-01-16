import React from 'react';
import { RollHistory } from '../../model/history';

interface IProps {
    history: RollHistory;
};
interface IState {

};

export default class HistoryComponent extends React.Component<IProps, IState> {
    state: IState = {
        
    };

    render () {
        return (
            <div>
                {this.props.history.diceString + ' ' + this.props.history.total + ' ' + this.props.history.dateTime.toString()}
            </div>
        );
    }
}
