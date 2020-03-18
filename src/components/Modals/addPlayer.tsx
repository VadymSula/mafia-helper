import React, {Component} from 'react';
import Modal from "../../models/modal";
import {connect} from "react-redux";
import {changeActiveRole, changeCountRoles, playersIsReady} from "../../store/actions";

interface State {
    isShowing: boolean,
    role: string,
    name?: string
}

interface Props {
    playersIsReady: any,
    changeCountRoles: any,
    changeActiveRole: any,
    player?: any,
    number: number,
    activeRole: string,
    mafiaLeft: number,
    donLeft: number,
    sheriffLeft: number,
    civilLeft: number,
}

class AddPlayerModal extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            role: this.props.activeRole,
            name: ''
        }
    }

    changeRole = (event) => {
        this.setState({
            role: event.target.value
        });
    };

    changeName = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    calculateRole = () => {
        if (this.props.civilLeft - 1 > 0)
            return 'civil';
        if (this.props.sheriffLeft === 1 && this.state.role !== 'sheriff')
            return 'sheriff';
        if (this.props.donLeft === 1 && this.state.role !== 'don')
            return 'don';
        return 'mafia'

    };

    sendPlayer = () => {
        let count;
        switch (this.state.role) {
            case 'civil':
                count = this.props.civilLeft - 1;
                break;
            case 'sheriff':
                count = this.props.sheriffLeft - 1;
                break;
            case 'don':
                count = this.props.donLeft - 1;
                break;
            case 'mafia':
                count = this.props.mafiaLeft - 1;
                break;
        }
        this.props.playersIsReady({
            name: this.state.name,
            role: this.state.role,
            ready: true,
            number: this.props.number,
            fouls: 0
        });
        this.props.changeCountRoles({
            role: this.state.role + 'Left',
            count: count
        });
        this.props.changeActiveRole(this.calculateRole());
        this.closeModal();
    };

    openModal = () => {
        this.setState({
            role: this.props.activeRole
        });
        this.setState({
            isShowing: true
        });
    };

    closeModal = () => {
        this.setState({
            isShowing: false
        });
    };

    render() {
        return (
            <div>
                {this.state.isShowing ? <div onClick={this.closeModal} className="back-drop"/> : null}

                <button onClick={this.openModal} className="players__add-player">+</button>
                <Modal
                    header="Add Player"
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModal}>
                    <input required type="text" name="name" onChange={this.changeName}/>
                    <select name="role" value={this.state.role} onChange={this.changeRole}>
                        {this.props.civilLeft !== 0 ? <option value="civil">Мирний житель</option> : null}
                        {this.props.sheriffLeft !== 0 ? <option value="sheriff">Шериф</option> : null}
                        {this.props.donLeft !== 0 ? <option value="don">Дон</option> : null}
                        {this.props.mafiaLeft !== 0 ? <option value="mafia">Мафія</option> : null}
                    </select>
                    <button onClick={this.sendPlayer}>Zalypa</button>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        activeRole: state.activeRole,
        mafiaLeft: state.mafiaLeft,
        donLeft: state.donLeft,
        sheriffLeft: state.sheriffLeft,
        civilLeft: state.civilLeft,
    }
};
const mapDispatchToProps = {
    playersIsReady,
    changeCountRoles,
    changeActiveRole
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPlayerModal);