import React, {Component} from "react";
import {connect} from "react-redux";
import PlayerDiv from "./playerDiv";
import {addCheck, changeCircle, changeKickStatus, changeKillStatus, changeVoting} from "../../../store/actions";

interface Player {
    name: string,
    role: string,
    ready: boolean,
    number: number,
    fouls: number
}

interface Props {
    player: {
        player1: Player,
        player2: Player,
        player3: Player,
        player4: Player,
        player5: Player,
        player6: Player,
        player7: Player,
        player8: Player,
        player9: Player,
        player10: Player,
    },
    changeVoting: any,
    circle: number,
    checks: any,
    changeCircle: any,
    store: any,
    addCheck: any,
    changeKickStatus: any,
    changeKillStatus: any,
    isKilled: boolean
}

interface State {
    currentCount: any,
    intervalId?: any,
    intervalIdM?: any,
    timeOutDurGame: string,
    timer: number,
    pause: boolean,
    currentCircle: number,
    gameIsEnd: boolean
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
            currentCircle: 1,
            gameIsEnd: false
        }
    }

    changeKillStatus = () => {
        this.props.changeKillStatus(true)
    };

    endCircle = () => {
        this.props.changeVoting([]);
        this.props.changeCircle(this.props.circle + 1);
        let _tmp = this.props.checks;
        _tmp[this.props.circle] = {
            sheriff: null,
            don: null,
            circle: this.props.circle + 1
        };
        this.props.addCheck(_tmp);
        this.props.changeKickStatus(false);
        this.props.changeKillStatus(false);
    };

    resumeTimer = () => {
        this.startTimer(this.state.timer);
        this.setState({pause: false})
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
        this.setState({timer: sec});
        this.setState({
            intervalIdM: setInterval(() => {
                if (this.state.timer - 1 === 0) {
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
                this.endTimerDurationGame();
                alert('mafia win');
                this.setState({gameIsEnd:true})
            } else if (countPlayers.black === 0) {
                this.endTimerDurationGame();
                alert('city win');
                this.setState({gameIsEnd:true})
            }
        }
    }

    endTimerDurationGame = () => {
        clearInterval(this.state.intervalId);
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
                                {this.state.pause ? null :
                                    <button onClick={() => this.startTimer(3)} className="btn-timer orange">30
                                        сек</button>}
                                {!this.state.pause ?
                                    <button onClick={this.pauseTimer} className="btn-timer red">pause</button> :
                                    <button onClick={this.resumeTimer} className="btn-timer red">resume</button>}
                            </div>
                            {this.state.pause ? <span className="time">PAUSE</span> :
                                <button onClick={() => this.startTimer(6)} className="btn-timer purple">1
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
                                    <div key={circle.circle}>
                                        <p>{circle.circle} ніч</p>
                                        <p>{circle.sheriff}</p>
                                        <p>{circle.don}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="btns-End">
                        <button onClick={this.endCircle} className="green">Закінчити круг</button>
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
        checks: state.checks,
        player: state,
        store: state,
        circle: state.currentCircle,
        isKilled: state.isKilled
    }
};

const mapDispatchToProps = {
    changeVoting,
    changeCircle,
    addCheck,
    changeKickStatus,
    changeKillStatus,
};
export default connect(mapStateToProps, mapDispatchToProps)(InGame)