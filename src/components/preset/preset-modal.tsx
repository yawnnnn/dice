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
        if (this.state.name === '' || this.state.diceString === '') {
            return;
        }

        this.props.onSave({name: this.state.name, diceString: this.state.diceString});
        this.setState({ name: '', diceString: '' });
    }

    close() {
        this.setState({ name: '', diceString: '' });
        this.props.onClose();
    }

    render () {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose} backdrop={'static'} animation={false} centered size="sm">
                <Modal.Header>
                    <Modal.Title>Add Preset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-row justify-content-between m-b-sm">
                        <div>Name</div>
                        <div><input value={this.state.name} onChange={(e) => this.changeName(e)} ></input></div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div>Dice</div>
                        <div><input value={this.state.diceString} onChange={(e) => this.changeDiceString(e)} ></input></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.close()}>
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
