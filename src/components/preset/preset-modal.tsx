import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface IProps {
    show: boolean;
    onClose: () => void;
    onSave: (obj: any) => void;
};
interface IState {
    name: string,
    diceString: string
};

export default class PresetModalComponent extends React.Component<IProps, IState> {
    state: IState = {
        name: '',
        diceString: ''
    };

    changeName(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ name: e.target.value });
    }

    changeDiceString (e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ diceString: e.target.value });
    }

    save () {
        this.props.onSave({name: this.state.name, diceString: this.state.diceString});
    }

    render () {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose} backdrop={'static'} animation={false} centered size="sm">
                <Modal.Header>
                    <Modal.Title>Add Preset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <input value={this.state.name} onChange={(e) => this.changeName(e)} ></input>
                    </div>
                    <div>
                        <input value={this.state.diceString} onChange={(e) => this.changeDiceString(e)} ></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.save()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
