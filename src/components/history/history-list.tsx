import React from 'react';
import HistoryComponent from './history';
import { RollHistory } from '../../model/history';

interface IProps {
    history: Array<RollHistory>
};
interface IState {

};

export default class HistoryListComponent extends React.Component<IProps, IState> {
    state: IState = {

    };

    render () {
        return (
            <div>
                <div className="font-semibold text-left m-b-md">
                    History
                </div>
                <div className="list-group">
                    {this.props.history.map((x, i) => <HistoryComponent key={i} history={x}></HistoryComponent>)}
                </div>
            </div>
        );
    }
}
