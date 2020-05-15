import React, {Component} from 'react';
import Modal from "../../models/modal";
import {connect} from "react-redux";
import {playersIsReady, setArrayPlayers} from "../../store/actions";

interface State {
    isShowing: boolean,
    player?: any,
    arrayPlayers: any,
    search?: string,
    searchResult?: any
}

interface Props {
    playersIsReady: any,
    number: number,
    arrayPlayers: any,
    setArrayPlayers: any
}

class AddPlayerModal extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            arrayPlayers: [],
            search: "",
            player: 0
        }
    }

    changeSearch = (event) => {
        this.setState({
            search: event.target.value.toUpperCase()
        });
    };

    changePlayer = (event) => {
        this.setState({
            player: event.target.value
        });
    };

    sendPlayer = () => {
        let idPlayer: any;
        if (!this.state.player)
            idPlayer = parseInt(this.state.arrayPlayers[0].id);
        else
            idPlayer = parseInt(this.state.player);
        let player = this.state.arrayPlayers.filter(player => player.id === idPlayer)[0];
        if (this.props.number === 0)
            this.props.playersIsReady({
                name: player.name,
                number: this.props.number,
                role: "lead",
                ready: true
            });
        else
            this.props.playersIsReady({
                name: player.name,
                ready: true,
                number: this.props.number,
                fouls: 0,
                active: true,
                role: "civil"
            });
        this.props.setArrayPlayers(this.state.arrayPlayers.filter(player => player.id !== idPlayer));
        this.closeModal();
    };

    componentDidMount() {
        this.setState({arrayPlayers: this.props.arrayPlayers});
    }

    componentDidUpdate() {
        if (!this.state.arrayPlayers || this.state.arrayPlayers.length !== this.props.arrayPlayers.length) {
            this.setState({arrayPlayers: this.props.arrayPlayers});
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
        let arr: any = [];
        if (this.state.arrayPlayers !== undefined) {
            for (let i = 0; i < this.state.arrayPlayers.length; i++) {
                let searchInput = this.state.search,
                    name = this.state.arrayPlayers[i].name.toUpperCase();
                if (this.state.search === "" || name.indexOf(searchInput as string) !== -1)
                    arr.push(this.state.arrayPlayers[i])
            }
        }
        return (
            arr.length ?
                <div>
                    {this.state.isShowing ? <div onClick={this.closeModal} className="back-drop"/> : null}
                    <button onClick={this.openModal}
                            className={this.props.number === 0 ? "players__add-player orange" : "players__add-player"}>+
                    </button>
                    <Modal
                        header={this.props.number === 0 ? "Ведучий" : "Додати гравця"}
                        className="modal"
                        show={this.state.isShowing}
                        close={this.closeModal}>
                        <div>
                            <input type="text" onChange={this.changeSearch} placeholder="Введіть для пошуку"/>
                            <div className="radio_buttons">

                                {arr.map((player) => {
                                    return (
                                        <div key={player.id}>
                                            <label>
                                                <input onChange={this.changePlayer} name='player'
                                                       type="radio"
                                                       value={player.id}/>
                                                {player.name}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {this.state.player !== 0 ? <button onClick={this.sendPlayer}>Add</button> :
                            <button className='disab'>Add</button>}
                    </Modal>
                </div>
                : "Упс... В нас закінчились гравці"
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