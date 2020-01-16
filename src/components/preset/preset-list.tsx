import React from 'react';
import PresetComponent from './preset';
import { Preset } from '../../model/preset';
import PresetModalComponent from './preset-modal';

interface IProps {
    presets: Array<Preset>;
    onAdd: (p: Preset) => void;
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

    openModal () {
        this.setState({ showModal: true });
    }

    onModalClose = () => {
        this.setState({ showModal: false });
    }

    onModalSave = (obj: any) => {
        if (this.state.presets.length < 5) {
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
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        Presets
                    </div>
                    <button onClick={() => this.openModal()}>Add</button>
                </div>
                
                {this.state.presets.map(p => {
                    return <PresetComponent key={p.id} preset={p} onClick={this.props.onClick}></PresetComponent>
                })}

                <PresetModalComponent show={this.state.showModal} onClose={this.onModalClose} onSave={this.onModalSave}></PresetModalComponent>
            </div>
        );
    }
}
