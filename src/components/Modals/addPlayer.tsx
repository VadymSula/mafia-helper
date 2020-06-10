import React, {Component} from 'react';
import Modal from "../../models/modal";
import {connect} from "react-redux";
import {playersIsReady, setArrayPlayers} from "../../store/actions";
import {API} from "../../servise/apiServise";

interface State {
    isShowing: boolean,
    player?: any,
    arrayPlayers: any,
    search?: string,
    searchResult?: any,
    addTabIsActive: boolean,
    newPlayerName: string,
    gender: string
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
            player: 0,
            addTabIsActive: false,
            newPlayerName: '',
            gender: '',
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
                role: "Lead",
                ready: true
            });
        else
            this.props.playersIsReady({
                name: player.name,
                ready: true,
                number: this.props.number,
                fouls: 0,
                active: true,
                role: "Civil"
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

    changeActiveTab = (event) => {
        event.preventDefault();
        this.setState({addTabIsActive: event.target.id === 'new'})
    };

    addNewPlayer = (event) => {
        event.preventDefault();
        let name = this.state.newPlayerName,
            gender = this.state.gender;
        if (name !== ''){
            if (gender !== ''){
                if (gender === 'm' || gender === 'f'){
                    API.addNewPlayer({
                        playerNickname: name,
                        gender: gender
                    }).then(res=>{
                        console.log(res)
                    })
                }
            } else {
                alert("Стать не може бути пустим")
            }
        } else {
            alert("Ім'я не може бути пустим")
        }
    };

    changeInput = (event) => {
        let name = event.target.name,
            value = event.target.value;
        switch (name) {
            case 'newPlayerName': {
                this.setState({newPlayerName: value});
                break;
            }
            case 'gender': {
                this.setState({gender: value});
                break;
            }
        }
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
                        <div className="TabsHead">
                            <h6 onClick={this.changeActiveTab} id="existing"
                                className={this.state.addTabIsActive ? '' : 'active'}>Обрати існуючого</h6>
                            <h6 onClick={this.changeActiveTab} id="new"
                                className={this.state.addTabIsActive ? 'active' : ''}>Додати нового</h6>
                        </div>
                        {
                            this.state.addTabIsActive ?
                                <div className="addNewPlayerForm">
                                    <form onSubmit={this.addNewPlayer}>
                                        <label className="col">
                                            Ім'я:
                                            <input
                                                name='newPlayerName'
                                                type="text"
                                                value={this.state.newPlayerName}
                                                onChange={this.changeInput}/>
                                        </label>
                                        <label className="col">
                                            Стать:
                                            <div className="divGender">
                                                <label className="gender">
                                                    <input
                                                        type="radio"
                                                        name='gender'
                                                        value="m"
                                                        onChange={this.changeInput}/>
                                                    чол
                                                </label>
                                                <label className="gender">
                                                    <input
                                                        type="radio"
                                                        name='gender'
                                                        value="f"
                                                        onChange={this.changeInput}/>
                                                    жін
                                                </label>
                                            </div>
                                        </label>
                                        <button className='green' onClick={this.addNewPlayer}>Додати гравця</button>
                                    </form>
                                </div>
                                : <div>
                                    <div>
                                        <input type="text" onChange={this.changeSearch}
                                               placeholder="Введіть для пошуку"/>
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
                                </div>
                        }
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