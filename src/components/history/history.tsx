import React from 'react';
import { RollHistory } from '../../model/history';

interface IProps {
    history: RollHistory;
};
interface IState {};

export default class HistoryComponent extends React.Component<IProps, IState> {
    render () {
        return (
            <div className={"list-group-item " + (this.props.history.isCritical ? 'list-group-item-danger' : '')}>
                <div className="d-flex flex-row align-items-center">
                    <div className="flex-1 text-left text-xs">
                        {new Date(this.props.history.dateTime).toLocaleDateString() + ' ' + new Date(this.props.history.dateTime).toLocaleTimeString()}
                        </div>
                    <div className="flex-1">{this.props.history.diceString}</div>
                    <div className="flex-1">{this.props.history.total}</div>
                </div>
            </div>
        );
    }
}
