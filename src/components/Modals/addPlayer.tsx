import React, {Component} from 'react';
import Modal from "../../models/modal";
import {connect} from "react-redux";
import {playersIsReady, setArrayPlayers} from "../../store/actions";

interface State {
    isShowing: boolean,
    player?: any,
    arrayPlayers:any,
    search?: string,
    searchResult?: any
}

interface Props {
    playersIsReady: any,
    number: number,
    arrayPlayers:any,
    setArrayPlayers: any
}

class AddPlayerModal extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            arrayPlayers: [],
            search: ""
        }
    }
    changeSearch = (event) => {
        this.setState({
            search: event.target.value
        });
    };

    changePlayer = (event) => {
        this.setState({
            player: event.target.value
        });
    };

    sendPlayer = () => {
        let idPlayer:any;
        if (!this.state.player)
            idPlayer = parseInt(this.state.arrayPlayers[0].id);
        else
            idPlayer = parseInt(this.state.player);
        let player = this.state.arrayPlayers.filter(player => player.id == idPlayer)[0];
        this.props.playersIsReady({
            name: player.name,
            ready: true,
            number: this.props.number,
            fouls: 0,
            active: true
        });
        this.props.setArrayPlayers(this.state.arrayPlayers.filter(player => player.id !== idPlayer));
        this.closeModal();
    };

    componentDidMount() {
        this.setState({arrayPlayers:this.props.arrayPlayers});
    }

    componentDidUpdate() {
        if (!this.state.arrayPlayers || this.state.arrayPlayers.length !== this.props.arrayPlayers.length){
            this.setState({arrayPlayers:this.props.arrayPlayers});
        }
    }

    openModal = () => {
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
        let arr:any = [];
        if (this.state.arrayPlayers != undefined){
            for (let i = 0; i<this.state.arrayPlayers.length;i++){
                if (this.state.search === "" || this.state.arrayPlayers[i].name.indexOf(this.state.search) !== -1)
                arr.push(this.state.arrayPlayers[i])
            }
        }
        return (
            this.props.arrayPlayers ?
            <div>
                {this.state.isShowing ? <div onClick={this.closeModal} className="back-drop"/> : null}

                <button onClick={this.openModal} className="players__add-player">+</button>
                <Modal
                    header="Add Player"
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModal}>
                    <input type="text" onChange={this.changeSearch}/>
                    <select required name="name" onChange={this.changePlayer}>
                        {arr.map(function (player) {
                                return (
                                    <option key={player.id} value={player.id}>{player.name}</option>
                                )
                        })}
                    </select>
                    <button onClick={this.sendPlayer}>Add</button>
                </Modal>
            </div>
                : "Немає гравців в базі данних"
        );
    }
}

const mapStateToProps = function (state) {
    return {
        arrayPlayers: state.arrayStartPlayers
    }
};
const mapDispatchToProps = {
    playersIsReady,
    setArrayPlayers
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPlayerModal);