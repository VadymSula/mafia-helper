import React, {Component} from "react";
import {connect} from "react-redux";
import PlayerDiv from "./playerDiv";
import {addCheck, changeCircle, changeVoting} from "../../../store/actions";

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
    addCheck:any
}

interface State {
    currentCount: any,
    intervalId?: any,
    intervalIdM?: any,
    timeOutDurGame: string,
    timer: number,
    pause: boolean,
    currentCircle: number
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
            currentCircle: 1
        }
    }

    endCircle = () => {
        this.props.changeVoting([]);
        this.props.changeCircle(this.props.circle + 1);
        let _tmp = this.props.checks;
        _tmp[this.props.circle] =  {
            sheriff: null,
            don: null,
            circle: this.props.circle + 1
        };
        this.props.addCheck(_tmp);
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
        // console.log(this.props.store)

        // if (this.state.currentCircle !== this.props.circle) {
        //     this.setState({
        //         checks: this.props.checks
        //     })
        // }
    }

    endTimerDurationGame = (event) => {
        clearInterval(this.state.intervalId);
        event.preventDefault();
    };

    render() {
        console.log(this.props.checks)
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
                        {/*<button onClick={this.endTimerDurationGame} className="red">Закінчити гру</button>*/}
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
        circle: state.currentCircle
    }
};

const mapDispatchToProps = {
    changeVoting,
    changeCircle,
    addCheck
};
export default connect(mapStateToProps, mapDispatchToProps)(InGame)