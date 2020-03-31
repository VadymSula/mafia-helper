import React, {Component} from "react";
import "./modal.css";
import {connect} from "react-redux";
import {changePlayerInfo, changeVoting, addCheck, changeKillStatus, changeKickStatus} from "../../../store/actions";

interface Props {
    player?: any,
    changePlayerInfo: any,
    changeVoting: any,
    voting: any,
    checks: {
        don: object,
        sheriff: object
    },
    addCheck: any,
    circle: number,
    isKilled: boolean,
    isKicked: boolean,
    changeKillStatus: any,
    changeKickStatus: any
}

interface State {
    isShowing: boolean,
    check: any,
    checked: boolean,
    isVoting: boolean,
    circle: number
}

class PlayerDiv extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            isShowing: false,
            check: 0,
            checked: false,
            isVoting: false,
            circle: this.props.circle
        }
    }

    componentDidUpdate() {
        if (!this.state.isVoting)
            this.props.voting.map(number => {
                if (parseInt(number) === this.props.player.number)
                    this.setState({
                        isVoting: true
                    })
            });
        else if (this.props.voting == 0)
            this.setState({
                isVoting: false
            });


        if (this.state.circle !== this.props.circle) {
            this.setState({
                checked: false
            });
            this.setState({
                circle: this.props.circle
            });
        }
    }

    addVoting = () => {
        let arr: any = this.props.voting;
        arr.push(this.props.player.number.toString());
        this.props.changeVoting(arr);
        this.setState({
            isShowing: false
        })
    };

    banPlayer = () => {
        let _tmp = this.props.player;
        _tmp.active = false;
        this.props.changePlayerInfo(_tmp);
        this.props.changeKickStatus(true);
        this.props.changeVoting([]);
        this.closeModal();
    };

    killPlayer = () => {
        let _tmp = this.props.player;
        _tmp.active = false;
        this.props.changePlayerInfo(_tmp);
        this.props.changeKillStatus(true);
        this.closeModal();
    };

    addFoul = () => {
        let pl = this.props.player;
        if (pl.fouls + 1 < 4) {
            pl.fouls++;
            this.props.changePlayerInfo(pl);
            this.setState({
                isShowing: false
            })
        } else if (pl.fouls + 1 === 4)
            this.banPlayer()
    };

    checkedPlayer = (event) => {
        let role = this.props.player.role;
        let circle = this.props.circle;
        event.preventDefault();
        if (this.state.checked)
            alert("isChecked");
        else {
            let _tmp = this.props.checks, arr = _tmp[circle - 1];
            arr[role] = this.state.check;
            _tmp[circle - 1] = arr;
            this.props.addCheck(_tmp);
            this.setState({checked: true});
        }
        this.setState({check: 0});
        this.closeModal();
    };

    updCheck = event => {
        this.setState({
            check: parseInt(event.target.value)
        });
    };

    openModal = () => {
        this.setState({
            isShowing: true
        });
    };

    closeModal = () => {
        this.setState({
            isShowing: false
        });
        this.setState({check: 0});
    };

    render() {
        return (

            <div className={this.props.player.active ? this.props.player.fouls === 3 ? 'player danger' : 'player'
                : 'player disabled'}>
                {
                    this.props.player.role === 'don' ? <i className="fas fa-user-secret iRole"/> :
                        this.props.player.role === 'mafia' ? <i className="fas fa-crosshairs iRole"/> :
                            this.props.player.role === 'sheriff' ? <i className="fab fa-empire iRole"/> : null
                }

                {this.props.player.active ?
                    <div className={this.state.isVoting ? "players-item isVoting" : "players-item"}>

                        {this.state.isShowing ? <div onClick={this.closeModal} className="back-drop"/> : null}
                        <p onClick={this.openModal}>
                            {this.props.player.number + ') ' + this.props.player.name}
                            <span>
                            {
                                !this.props.player.fouls ? " " :
                                    this.props.player.fouls === 1 ? 'I' :
                                        this.props.player.fouls === 2 ? 'II' : 'III'
                            }
                            </span>
                        </p>
                        <div className="modal-wrapper"
                             style={{
                                 display: this.state.isShowing ? 'block' : 'none',
                             }}>
                            <div className="modal">
                                <div>
                                    <button onClick={this.addFoul} className="foul">ФОЛ</button>
                                    {!this.state.isVoting && !this.props.isKicked ?
                                        <button onClick={this.addVoting} className="voting" title="Виставити на голосування">
                                            <i className="fas fa-thumbs-up"/>
                                        </button> : null}
                                    {
                                        this.state.isVoting && !this.props.isKicked ?
                                    <button onClick={this.banPlayer} className="del" title="Вигнати через суд">
                                        <i className="fas fa-user-slash"/>
                                    </button>:null}
                                    {!this.props.isKilled ? <button className="red" onClick={this.killPlayer}><i className="far fa-dizzy"/></button> : null}
                                </div>
                                {
                                    this.props.player.role === 'don' && !this.state.checked ?
                                        <form onSubmit={this.checkedPlayer}>
                                            <input max={10} placeholder="№" type="number"
                                                   onChange={this.updCheck}/>
                                            <button className="checkDon"><i className="fas fa-check"/></button>
                                        </form> : null
                                }
                                {
                                    this.props.player.role === 'sheriff' && !this.state.checked ?
                                        <form onSubmit={this.checkedPlayer}>
                                            <input max={10} placeholder="№" type="number"
                                                   onChange={this.updCheck}/>
                                            <button type='submit' className="checkSheriff"><i
                                                className="fas fa-check"/>
                                            </button>
                                        </form> : null
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className="players-item disabled">
                        <p>{this.props.player.number + ') ' + this.props.player.name}</p>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        voting: state.voting,
        circle: state.currentCircle,
        checks: state.checks,
        isKilled: state.isKilled,
        isKicked: state.isKicked
    }
};
const mapDispatchToProps = {
    changePlayerInfo,
    changeVoting,
    addCheck,
    changeKillStatus,
    changeKickStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(PlayerDiv)
