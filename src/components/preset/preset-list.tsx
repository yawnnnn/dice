import React from 'react';
import PresetComponent from './preset';
import { Preset } from '../../model/preset';
import PresetModalComponent from './preset-modal';

interface IProps {
    presets: Array<Preset>;
    onAdd: (p: Preset) => void;
    onDelete: (index: number) => void;
    onClick: (obj: any) => void;
};
interface IState {
    presets: Array<Preset>;
    showModal: boolean;
};

export default class PresetList extends React.Component<IProps, IState> {
    state: IState = {
        presets: this.props.presets ? this.props.presets : [],
        showModal: false
    };

    componentDidUpdate (prevProps: IProps, prevState: IState) {
        if (JSON.stringify(prevProps.presets) !== JSON.stringify(this.props.presets)) {
            this.setState({
                presets: this.props.presets
            });
        }
    }

    openModal () {
        this.setState({ showModal: true });
    }

    onModalClose = () => {
        this.setState({ showModal: false });
    }

    onModalSave = (obj: any) => {
        if (this.state.presets.length < 4) {
            let x = this.state.presets.slice();
            let p = new Preset();
            p.id = x.length + 1;
            p.name = obj.name;
            p.diceString = obj.diceString;
            x.push(p);
            this.setState({presets: x, showModal: false});

            this.props.onAdd(p);
        } else {
            this.setState({ showModal: false });
        }
    }

    render () {
        return (
            <div>
                <div className="d-flex flex-row align-items-center justify-content-between m-b-md">
                    <div className="font-semibold ">
                        Presets
                    </div>
                    <button className="btn btn-sm btn-outline-dark" onClick={() => this.openModal()}>Add</button>
                </div>
                <div className="list-group d-flex flex-column">
                    {this.state.presets.map((p, i) => {
                        return <PresetComponent key={p.id} preset={p} index={i} onClick={this.props.onClick} onDelete={this.props.onDelete}></PresetComponent>
                    })}
                </div>

                <PresetModalComponent show={this.state.showModal} onClose={this.onModalClose} onSave={this.onModalSave}></PresetModalComponent>
            </div>
        );
    }
}
