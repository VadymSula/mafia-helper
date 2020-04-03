import React, {Component} from "react";
import {connect} from "react-redux";
import PlayerDiv from "./playerDiv";
import {
    addCheck,
    changeCircle,
    changeKickStatus,
    changeKillStatus,
    changeVoting,
    endGame, setBestMove
} from "../../../store/actions";
import {API} from "../../../servise/apiServise";

// interface Player {
//     name: string,
//     role: string,
//     ready: boolean,
//     number: number,
//     fouls: number
// }

interface Props {
    player: any,
    changeVoting: any,
    circle: number,
    checks: any,
    changeCircle: any,
    addCheck: any,
    changeKickStatus: any,
    changeKillStatus: any,
    isKilled: boolean,
    endGame: any,
    kills: any,
    gameIsStarted: any
    bestMove: any,
    setBestMove: any
}

interface State {
    currentCount: any,
    intervalId?: any,
    intervalIdM?: any,
    timeOutDurGame: string,
    timer: number,
    pause: boolean,
    currentCircle: number,
    gameIsEnd: boolean,
    isShowingBestMoveModal: boolean,
    isShowingBestMoveButton: boolean,
    messageErrorBestMove?: string,
    bestMoveIsOk?: boolean
}

class InGame extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            currentCount: 0,
            intervalId: null,
            intervalIdM: null,
            timeOutDurGame: '0:00:00',
            timer: 0,
            pause: false,
            currentCircle: 0,
            gameIsEnd: false,
            isShowingBestMoveModal: false,
            isShowingBestMoveButton: false,
        }
    }

    changeKillStatus = () => {
        this.props.changeKillStatus({status: true, arr: this.props.kills})
    };

    endCircle = () => {
        if (!this.state.isShowingBestMoveButton) {
            this.props.changeVoting([]);
            this.props.changeCircle(this.props.circle + 1);
            let _tmp = this.props.checks;
            _tmp[this.props.circle] = {
                sheriffCheck: null,
                donCheck: null,
                numberOfTheCircle: this.props.circle + 1
            };
            this.props.addCheck(_tmp);
            this.props.changeKickStatus(false);
            this.props.changeKillStatus({status: false, arr: this.props.kills});
        } else {
            alert("Введіть кращий хід");
        }
    };

    resumeTimer = () => {
        if (this.state.timer <= 0)
            this.clearTimer();
        else {
            this.startTimer(this.state.timer);
            this.setState({pause: false})
        }
    };

    clearTimer = () => {
        this.setState({timer: 0});
        clearInterval(this.state.intervalIdM);
        this.setState({pause: false});
    };

    pauseTimer = () => {
        clearInterval(this.state.intervalIdM);
        this.setState({pause: true})
    };

    startTimer = (sec) => {
        if (this.state.intervalIdM !== null)
            this.clearTimer();
        this.setState({timer: sec});
        this.setState({
            intervalIdM: setInterval(() => {
                if (this.state.timer - 1 <= 0) {
                    clearInterval(this.state.intervalIdM);
                    document.body.style.background = '#f00';
                    setInterval(() => document.body.style.background = '#fff',
                        2500)
                }
                this.setState({timer: this.state.timer - 1});
            }, 1000)
        })
    };

    startTimerDurationGame = () => {
        this.setState({
            intervalId: setInterval(() => {
                let hrs = ~~(this.state.currentCount / 3600);
                let min = ~~((this.state.currentCount % 3600) / 60);
                let secs = ~~this.state.currentCount % 60;

                let ret = "";

                ret += "" + hrs + ":" + (min < 10 ? "0" : "");
                ret += "" + min + ":" + (secs < 10 ? "0" : "");
                ret += "" + secs;
                this.setState({timeOutDurGame: ret});
                this.setState({currentCount: this.state.currentCount + 1});
            }, 1000)
        })
    };

    endGame = (winner: string, countPlayers: any) => {
        if (this.props.gameIsStarted) {
             let players: any = [], sheriffIsKilled = false, typeWin = 'mafia is Dead',
            firstKill = this.props.kills[0].playerNumber;
        if (winner === 'mafia')
            typeWin = countPlayers.black + '#' + countPlayers.black;
        if (this.props.player['player' + firstKill].role === 'sheriff')
            sheriffIsKilled = true;

        for (let i = 1; i <= 10; i++) {
            let player = this.props.player['player' + i], _tmp_info;
            _tmp_info = {
                foulsQuantity: player.fouls,
                firstKillSheriff: false,
                killed: !player.active,
                roleInGame: player.role,
            };
            if (player.role === 'mafia' || player.role === 'don')
                if (sheriffIsKilled) {
                    _tmp_info.firstKillSheriff = true;
                }
            if (this.props.kills[0].playerNumber === player.number){
                _tmp_info.goldenMove = this.props.bestMove;
            }

            players.push(_tmp_info);
        }
        this.endTimerDurationGame();
        this.setState({gameIsEnd: true});
        this.props.endGame(true);
        API.sendGameInformation({
            checksResult: this.props.checks,
            gameDuration: this.state.currentCount,
            win: winner,
            typeWin: typeWin,
            playersResult: players,
            kills: this.props.kills
        }).then(response => {
            console.log(response)
        });
        }
    };

    componentDidMount() {
        this.startTimerDurationGame();
    }

    componentDidUpdate() {
        if (!this.state.gameIsEnd) {
            let countPlayers = {
                red: 0,
                black: 0
            };
            for (let i = 1; i <= 10; i++) {
                if (this.props.player['player' + i].active === true)
                    if (this.props.player['player' + i].role === 'civil' || this.props.player['player' + i].role === 'sheriff')
                        countPlayers.red++;
                    else
                        countPlayers.black++;
            }
            if (countPlayers.red === countPlayers.black) {
                this.endGame('mafia', countPlayers);
            } else if (countPlayers.black === 0) {
                this.endGame('city', countPlayers);
            }
        }
        if (this.props.kills.length === 1 && !this.state.isShowingBestMoveButton) {
            if (!this.state.bestMoveIsOk)
                this.setState({isShowingBestMoveButton: true})
        }
    }

    endTimerDurationGame = () => {
        clearInterval(this.state.intervalId);
    };

    openModal = () => {
        this.setState({
            isShowingBestMoveModal: true
        });
    };

    closeModal = () => {
        this.setState({
            isShowingBestMoveModal: false
        });
    };

    addBestMove = event => {
        event.preventDefault();
        let numbers = [
            parseInt(event.target.children[0].value),
            parseInt(event.target.children[1].value),
            parseInt(event.target.children[2].value)
        ];
        if (numbers[0] === numbers[1] || numbers[0] === numbers[2] || numbers[2] === numbers[1]) {
            this.setState({messageErrorBestMove: 'Гравці не можуть повторюватись'});
            setTimeout(() => this.setState({messageErrorBestMove: ''}), 3000);
        } else {
            this.props.setBestMove(numbers);
            this.setState({isShowingBestMoveModal: false});
            this.setState({isShowingBestMoveButton: false});
            this.setState({bestMoveIsOk: true});
        }
    };

    render() {
        return (
            <section>
                <h1>{this.state.timeOutDurGame}</h1>
                <div className="players game">
                    <div className="first_col col">
                        <PlayerDiv player={this.props.player.player5}/>
                        <PlayerDiv player={this.props.player.player6}/>
                    </div>
                    <div className="second_col col">
                        <div>
                            <PlayerDiv player={this.props.player.player4}/>
                            <PlayerDiv player={this.props.player.player3}/>
                            <PlayerDiv player={this.props.player.player2}/>
                        </div>
                        <div className="timers">
                            <div>
                                {this.state.timer !== 0 ?
                                    <button onClick={this.clearTimer} className="btn-timer red">clear</button> : null}
                                {this.state.pause || this.state.timer !== 0
                                    ? null
                                    : <button onClick={() => this.startTimer(30)} className="btn-timer orange">30
                                        сек</button>}
                                {!this.state.pause && this.state.timer !== 0 ?
                                    <button onClick={this.pauseTimer} className="btn-timer red">pause</button> : null}

                                {this.state.pause ?
                                    <button onClick={this.resumeTimer} className="btn-timer red">resume</button> : null}

                            </div>
                            {this.state.pause ? <span className="time">PAUSE</span> : null}
                            {this.state.pause || this.state.timer !== 0
                                ? null
                                : <button onClick={() => this.startTimer(60)} className="btn-timer red">1
                                    хвилина</button>}

                            <span className="time">{this.state.timer !== 0 ? this.state.timer : null}</span>
                            <i className="fas fa-stopwatch"/>
                        </div>
                        <div>
                            <PlayerDiv player={this.props.player.player7}/>
                            <PlayerDiv player={this.props.player.player8}/>
                            <PlayerDiv player={this.props.player.player9}/>
                        </div>
                    </div>
                    <div className="third_col col">
                        <PlayerDiv player={this.props.player.player1}/>
                        <PlayerDiv player={this.props.player.player10}/>
                    </div>
                </div>
                <div className="footerBlock">
                    <div className="checks">
                        <div>
                            <br/>
                            <p>Перевірки Шеріфа:</p>
                            <p>Перевірки Дона:</p>
                        </div>
                        {
                            this.props.checks.map(circle => {
                                return (
                                    <div key={circle.numberOfTheCircle}>
                                        <p>{circle.numberOfTheCircle} день</p>
                                        <p>{circle.sheriffCheck}</p>
                                        <p>{circle.donCheck}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="btns-End">
                        <button onClick={this.endCircle} className="green">Закінчити круг</button>
                        <div>
                            {this.state.isShowingBestMoveModal ?
                                <div onClick={this.closeModal} className="back-drop"/> : null}
                            {this.state.isShowingBestMoveButton
                                ? <button onClick={this.openModal} className="orange">Кращий хід</button>
                                : null
                            }
                            <div className="modal-wrapper"
                                 style={{
                                     display: this.state.isShowingBestMoveModal ? 'block' : 'none',
                                 }}>
                                <div className="modal">
                                    <form onSubmit={this.addBestMove}>
                                        <input required max={10} placeholder="№" type="number"/>
                                        <input required max={10} placeholder="№" type="number"/>
                                        <input required max={10} placeholder="№" type="number"/>
                                        <button type='submit' className="checkSheriff">
                                            <i className="fas fa-arrow-right"/>
                                        </button>
                                    </form>
                                    <p style={{color: 'red'}}>{this.state.messageErrorBestMove}</p>
                                </div>
                            </div>
                        </div>
                        {!this.props.isKilled ?
                            <button onClick={this.changeKillStatus} className="red">Промах</button> : null}
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        gameIsStarted: state.startGame,
        checks: state.checks,
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
        circle: state.currentCircle,
        isKilled: state.isKilled,
        kills: state.kills,
        bestMove: state.bestMove
    }
};

const mapDispatchToProps = {
    changeVoting,
    changeCircle,
    addCheck,
    changeKickStatus,
    changeKillStatus,
    endGame,
    setBestMove
};
export default connect(mapStateToProps, mapDispatchToProps)(InGame)