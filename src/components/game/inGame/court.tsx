import React, {Component} from "react";
import {connect} from "react-redux";
import {
    changeCourtStatus,
    changeKickStatus,
    changePlayerInfo,
    changeVoting
} from "../../../store/actions";

interface State {
    isShowing: boolean,
    voting: any,
    sumVoting: number;
    countPlayers: number,
    isError: boolean,
    resultMessage: string,
    isOK: boolean,
    startArray: any,
    step: any,
    isCut: boolean,
    cutBtnsShow: boolean
}

interface Props {
    player: any,
    changeCourtStatus: any,
    voting: any,
    courtStatus: boolean,
    changeVoting: any,
    currentCircle: number,
    changeKickStatus: any,
    changePlayerInfo: any
}

class Court extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            isOK: false,
            startArray: [],
            resultMessage: '',
            isShowing: false,
            voting: [],
            sumVoting: 0,
            countPlayers: 0,
            isError: false,
            isCut: false,
            cutBtnsShow: false,
            step: {
                type: "continue"
            }
        }
    }

    banPlayer = (number) => {
        let _tmp = this.props.player['player' + number];
        _tmp.active = false;
        _tmp.typeNotActive = 'voting';
        this.props.changePlayerInfo(_tmp);
        this.props.changeKickStatus(true);
        this.props.changeVoting([]);
        this.closeModal();
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
    };

    howActivePlayers() {
        let active = 0;
        for (let i = 1; i <= 10; i++)
            if (this.props.player['player' + i].active)
                active++;
        return active;
    }

    componentDidUpdate() {

        if (this.state.startArray.length !== this.props.voting.length && !this.state.isCut)
            this.setState({startArray: this.props.voting});

        if (!this.props.courtStatus && this.props.voting.length !== 0)
            this.props.changeCourtStatus(true);
        else if (this.props.courtStatus && this.props.voting.length === 0)
            this.props.changeCourtStatus(false);

        if (this.howActivePlayers() !== this.state.countPlayers)
            this.setState({countPlayers: this.howActivePlayers()});

        this.calcSumVoting();

        if (this.state.isOK && this.state.isError)
            this.setState({isOK: false});
        else if (!this.state.isOK && !this.state.isError)
            this.setState({isOK: true});

        if (this.props.courtStatus)
            this.resultCourtText();
    };

    checkSetState = (str) => {
        if (this.state.resultMessage !== str)
            this.setState({resultMessage: str})
    };

    checkPlayers = () => {
        let max = 0, count = 0;
        if (this.state.voting.length > 0) {
            this.state.voting.map(vot => {
                if (vot.count > max)
                    max = vot.count;
                count += vot.count;
                return 0;
            });
            if (this.state.countPlayers === count) {
                if (this.state.voting.filter(vot => vot.count === max).length > 1) {
                    if (this.state.isCut && !this.state.cutBtnsShow) {
                        this.setState({cutBtnsShow: true});
                    } else {
                        this.checkSetState("Автокатастрофа");
                        if (this.state.step.type !== 'cut')
                            this.setState({step: {type: 'cut'}});
                    }
                } else {
                    let player = this.state.voting.filter(vot => vot.count === max)[0];
                    this.checkSetState("Виганяється гравець під номером " + parseInt(player.number));
                    if (this.state.step.type !== 'ban1')
                        this.setState({
                            step: {
                                type: 'ban1',
                                num: parseInt(player.number)
                            }
                        })
                }
            } else {
                if (!this.state.isError)
                    this.setState({isError: true});
                if (this.state.step.type !== 'continue')
                    this.setState({step: {type: 'continue'}})
            }
        } else {
            if (this.state.isCut) {
                this.checkSetState("Повторне голосування");
                if (this.state.step.type !== 'wait')
                    this.setState({step: {type: 'wait'}})
            } else {
                this.checkSetState("Голосування");
                if (this.state.step.type !== 'wait')
                    this.setState({step: {type: 'wait'}})
            }
        }

    };

    resultCourtText() {
        let message: any = document.getElementById('resultMessage');
        switch (this.props.currentCircle) {
            case 0: {
                if (this.state.startArray.length === 1) {
                    message.innerText = "Продовжуємо гру";
                    if (this.state.step.type !== 'continue')
                        this.setState({
                            step: {
                                type: 'continue'
                            }
                        })
                } else {
                    if (this.state.startArray.length >= 2) {
                        this.checkPlayers()
                    }
                }
                break;
            }
            default: {
                if (this.state.startArray.length === 1) {
                    this.checkSetState("Виганяється гравець під номером " + parseInt(this.state.startArray[0]));
                    if (this.state.step.type !== 'ban1' && this.state.startArray)
                        this.setState({
                            step: {
                                type: 'ban1',
                                num: parseInt(this.state.startArray[0])
                            }
                        })
                } else if (this.state.startArray.length >= 2) {
                    this.checkPlayers();
                }
            }
        }
    };

    finishCourt = () => {
        switch (this.state.step.type) {
            case "continue": {
                this.endCourt();
                break;
            }
            case "wait": {
                break;
            }
            case 'ban1': {
                this.banPlayer(this.state.step.num);
                this.endCourt();
                break;
            }
            case 'ban2': {
                this.state.step.num.map(num => {
                    this.banPlayer(num);
                });
                this.endCourt();
                break;
            }
            case 'cut': {
                let max = 0, array: any = [];
                this.state.voting.map(vot => {
                    if (vot.count > max)
                        max = vot.count;
                });
                this.state.voting.map(vot => {
                    if (vot.count === max)
                        array.push(vot.number)
                });
                this.setState({startArray: array});
                this.setState({isCut: true});
                let votingArr = this.state.voting,
                    arrInput: any = document.getElementsByClassName('inputCountVoice');
                for (let i = 0; i < arrInput.length; ++i) {
                    let item = arrInput[i];
                    item.children[0].value = '0';
                }
                votingArr.map(vot => vot.count = 0);
                this.setState({voting: votingArr});
                break;
            }
        }
    };

    endCourt = () => {
        this.props.changeKickStatus(true);
        this.setState({isOK: true});
        this.props.changeCourtStatus(false);
        this.closeModal();
        this.props.changeVoting([]);
        this.setState({voting: []});
        this.setState({step: {type: null}});
        this.setState({startArray: []});
        this.setState({isCut: false});
    };

    calcSumVoting() {
        let countVoting = 0;
        this.state.voting.map(vot => {
            countVoting += vot.count;
        });
        if (this.state.sumVoting !== countVoting)
            this.setState({sumVoting: countVoting});
    };

    changeVoting = (event) => {
        let num = event.target.name, value = event.target.value, array: any = this.state.voting,
            messageEl = event.target.parentElement.childNodes[2];
        array = array.filter(obj => obj.number !== parseInt(num));
        if (!value)
            value = 0;
        if (value > this.state.countPlayers) {
            messageEl.innerText = "Кількість голосів за одного гравця не має перевищувати: " + this.state.countPlayers;
            value = this.state.countPlayers;
            this.setState({isError: true})
        } else if (value < 0) {
            messageEl.innerText = "Кількість голосів не має бути менше 0";
            value = 0;
            this.setState({isError: true})
        } else {
            this.setState({isError: false});
            messageEl.innerText = "";
        }
        array.push({
            number: parseInt(num),
            count: parseInt(value)
        });
        this.setState({voting: array})
    };

    setCutType = (event) => {
        this.setState({
            step: {
                type: event.target.name,
                num: [this.state.startArray[0], this.state.startArray[1]]
            }
        });

        this.setState({cutBtnsShow: false});
        this.setState({startArray: []})
    };

    render() {
        return (
            this.props.courtStatus ?
                <div>
                    {this.state.isShowing ?
                        <div onClick={this.closeModal} className="back-drop"/> : null}
                    {!this.state.isShowing
                        ? <button onClick={this.openModal} className="orange">Суд</button>
                        : null
                    }
                    <div className="modal-wrapper court"
                         style={{
                             display: this.state.isShowing ? 'block' : 'none',
                         }}>
                        <h2>Суд</h2>
                        <div className="modal">
                            <ul>
                                <h3 id="resultMessage"
                                    className='resultMessage'>{this.state.isError ? 'Помилка' : this.state.resultMessage}</h3>
                                <h3>На голосуванні:</h3>
                                {this.state.startArray.map(num => {
                                    let player = this.props.player['player' + num];
                                    return (
                                        <li className="inputCountVoice" key={num}>
                                            {player.number + ") " + player.name}
                                            <input  defaultValue=''
                                                   onChange={this.changeVoting} name={num}
                                                   type="number" max={10}
                                                   min={0}/>
                                            <span className='errorMessage'/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        {
                            this.state.isError ?
                                <p className='errorMessage'>Невірно вказані голоси</p>
                                : null
                        }
                        {
                            this.state.cutBtnsShow ?
                                <div>
                                    <button className="green" name="continue" onClick={this.setCutType}>Залишити обох
                                    </button>
                                    <button className="orange" name="ban2" onClick={this.setCutType}>Підняти обох
                                    </button>
                                </div> : null

                        }
                        {
                            this.state.isOK && !this.state.cutBtnsShow ?
                                <button className="red" onClick={this.finishCourt}>Продовжити</button>
                                : null
                        }
                    </div>
                </div> : null
        );
    }
}

const mapStateToProps = function (state) {
    return {
        courtStatus: state.courtStatus,
        player: {
            player1: state.player1,
            player2: state.player2,
            player3: state.player3,
            player4: state.player4,
            player5: state.player5,
            player6: state.player6,
            player7: state.player7,
            player8: state.player8,
            player9: state.player9,
            player10: state.player10,
        },
        voting: state.voting,
        currentCircle: state.currentCircle
    }
};

const mapDispatchToProps = {
    changeCourtStatus,
    changeVoting,
    changePlayerInfo,
    changeKickStatus
};
export default connect(mapStateToProps, mapDispatchToProps)(Court)