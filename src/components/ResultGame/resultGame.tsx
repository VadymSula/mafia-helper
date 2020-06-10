import React, {Component} from "react";
import {connect} from "react-redux";
import "./resultGame.css";
import Mafia from "../../assets/images/mafiaWin.png";
import City from "../../assets/images/townWin.png";
import {setResultGame} from "../../store/actions";
import {Input, InputAdornment} from "@material-ui/core";
// import {API} from "../../servise/apiServise";


interface Props {
    setResultGame: any,
    resultGame: any,
    roles: any,
}

interface State {
    positive: any,
    negative: any,
    pointsSum: number,
    gameDuration?: any,
    roles?: any,
}

class ResultGame extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            positive: [],
            negative: [],
            pointsSum: 0,
        }
    }

    sendPoints = () => {
        let {resultGame} = this.props,
            playersPoint = [
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 1,
                        "nickName": "string"
                    },
                    "ratingValue": 0,
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 2,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 3,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 4,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 5,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 6,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 7,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 8,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 9,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                },
                {
                    "club": {
                        "clubName": "FMC",
                        "idClub": 1
                    },
                    "player": {
                        "idPlayer": 10,
                        "nickName": "string"
                    },
                    "ratingValue": 0
                }
            ],
            positive = this.state.positive,
            negative = this.state.negative;
        playersPoint.map((player, index) => {
            let i = player.player.idPlayer;
            player.player.nickName = resultGame.playersResult[index].name;
            let playerP = positive.filter(pl => pl.number === i)[0];
            if (playerP)
                player.ratingValue += playerP.value;
            let playerN = negative.filter((pl, key) => key === i)[0];
            if (playerN)
                player.ratingValue -= playerN;
            player.ratingValue = parseFloat(player.ratingValue.toFixed(1));
            return 0;
        });
        // API.sendExtraPoints(resultGame).then(responce => {
        //     console.log(responce)
        // })
    };

    changePlusPoints = (event) => {
        let arr: any = this.state.positive,
            val = parseFloat(event.target.value),
            sum = 0,
            num = parseInt(event.target.id);
        arr = arr.filter(pl => parseInt(pl.number) !== num);
        if (val >= 0.7) {
            event.target.value = 0.7;
            arr.push({
                number: num,
                value: 0.7
            })
        } else if (val <= 0)
            event.target.value = 0;
        else if (val > 0 && val < 0.7) {
            event.target.value = val;
            arr.push({
                number: num,
                value: val
            })
        }
        arr.map(pl => sum += pl.value);
        sum = parseFloat(sum.toFixed(1));
        this.setState({pointsSum: sum});
        this.setState({positive: arr});
    };

    changeMinusPoints = (event) => {
        let arr: any = this.state.negative,
            val = parseFloat(event.target.value),
            num = event.target.id;
        if (val >= 0.4) {
            event.target.value = 0.4;
            arr[num] = 0.4;
        } else if (val <= 0) {
            event.target.value = 0;
        } else {
            event.target.value = val;
            arr[num] = val;
        }
        this.setState({negative: arr})
    };

    calculateTime = (time) => {
        let d = Number(time);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);

        let hDisplay = h;
        let mDisplay = m < 10 ? '0' + m : m;
        let sDisplay = s < 10 ? '0' + m : s;
        return hDisplay + ':' + mDisplay + ':' + sDisplay;
    };

    componentDidMount(): void {
        if (this.props.resultGame) {
            let game = this.props.resultGame;
            this.setState({gameDuration: this.calculateTime(game.gameDuration)})
        }
    }

    render() {
        let game: any;
        if (this.props.resultGame)
            game = this.props.resultGame;
        let arrayPlayers = game.playersResult.filter(pl => pl.roleInGame.roleName !== 'Lead');
        // Гравець, який дає "кращий хід"
        let playerBM = game.playersResult.filter(player => player.goldenMove !== undefined)[0], str_: any;
        if (playerBM) {
            if (playerBM.goldenMove !== undefined)
                str_ = playerBM.goldenMove;
            else
                str_ = [0];
            str_ = str_.join('/');
        }
        // Перевірка в дона на перше вбивство шерифа
        let don = game.playersResult.filter(player => player.roleInGame.roleName === 'Don')[0];
        // Чорні перевірки шерифа
        let blackChecks: any = [];
        game.checksResult.forEach((check) => {
            if (check.sheriffCheck) {
                if (game.playersResult[check.sheriffCheck - 1].roleInGame.roleName === 'Mafia' || game.playersResult[check.sheriffCheck - 1].roleInGame.roleName === 'Don') {
                    blackChecks.push(check.sheriffCheck)
                }
            }
        });
        let checkArr = blackChecks.join('/');
        let sheriff = game.playersResult.filter(player => player.roleInGame.roleName === 'Sheriff')[0];
        return (
            <div className="body ResultGame">
                <div className="header">
                    {game.win === 'mafia' ?
                        <img className="logo__result_left logo" src={Mafia} alt="mafia team"/> :
                        <img className="logo__result_left logo" src={City} alt="mafia team"/>
                    }
                    <div className="result-name">
                        <h1 className="result_one">{game.win}</h1>
                        <h2 className="result_two">{game.typeWin}</h2>
                    </div>
                    {game.win === 'mafia' ?
                        <img className="logo__result_left logo" src={Mafia} alt="mafia team"/> :
                        <img className="logo__result_left logo" src={City} alt="mafia team"/>
                    }
                </div>
                <div className="content">
                    <div className="column_one">
                        <ul className="player">
                            {arrayPlayers.map(player => {
                                let num = player.number.toString();
                                return (
                                    <li key={player.number} className={!player.killed ? "" : "disabledPlayer"}>
                                        <p>
                                            <span>{num})</span>
                                            {player.name}
                                            {
                                                player.roleInGame.roleName === 'Don' ?
                                                    <i className="fas fa-user-secret iRole"/> :
                                                    player.roleInGame.roleName === 'Mafia' ?
                                                        <i className="fas fa-crosshairs iRole"/> :
                                                        player.roleInGame.roleName === 'Sheriff' ?
                                                            <i className="fab fa-empire iRole"/> : null
                                            }
                                        </p>
                                        {/*{*/}
                                        {/*    game.isEnd && game.isRating ?*/}
                                        <div className="Inputs">
                                            <div className="plus">
                                                <Input
                                                    id={num}
                                                    onChange={this.changePlusPoints}
                                                    placeholder={'0'}
                                                    type='number'
                                                    defaultValue=''
                                                    value={this.state.positive[player.number] > 0 ? '' : this.state.positive[player.number]}
                                                    startAdornment={<InputAdornment position="start">+</InputAdornment>}
                                                />
                                            </div>
                                            <div className="minus">
                                                <Input
                                                    id={num}
                                                    onChange={this.changeMinusPoints}
                                                    placeholder={'0'}
                                                    defaultValue=''
                                                    value={this.state.negative[player.number]}
                                                    type='number'
                                                    startAdornment={<InputAdornment position="start">-</InputAdornment>}
                                                />
                                            </div>

                                            {/*<input className='plus' type="text"/>*/}
                                            {/*<input className='minus' type="text"/>*/}
                                        </div>
                                        {/*: null*/}
                                        {/*}*/}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="column_second">
                        <div className='lead'>
                            <h3>Ведучий: {game.playersResult[0].name}</h3>
                        </div>
                        <div className="timer">
                            <h3>
                                <span>Тривалість гри:</span>
                                <span>{this.state.gameDuration}</span>
                            </h3>
                        </div>
                        <div className="divTable checkTable">
                            <div className="divTableHeading">
                                <div className="divTableRow">
                                    <div className="divTableHead">Перевірки Шеріфа</div>
                                    <div className="divTableHead">Перевірки Дона</div>
                                </div>
                            </div>
                            <div className="divTableBody">
                                {game.checksResult.map(check => {
                                    let don, sheriff;
                                    if (check.sheriffCheck)
                                        sheriff = check.sheriffCheck;
                                    else
                                        sheriff = "-";

                                    if (check.donCheck)
                                        don = check.donCheck;
                                    else
                                        don = "-";
                                    return (
                                        <div key={check.numberOfTheCircle} className="divTableRow">
                                            <div className="divTableCell">{sheriff}</div>
                                            <div className="divTableCell">{don}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="features-game">
                            <h2>Особливості гри</h2>
                        </div>
                        <div className="best__act">
                            {playerBM ?
                                <div className="gold__act">
                                    <h3 className="head">Кращий хід:</h3>
                                    <p className="gold__act head1"><span>{playerBM.number + ')'} {playerBM.name}</span>
                                        <span>{str_}</span></p>
                                </div> : null
                            }
                            {don.firstKillSheriff ?
                                <div className="first__blood">
                                    <h3 className="head">Перша кров Шерифа</h3>
                                </div> : null
                            }
                            {blackChecks.length > 0 ?
                                <div className="black__checks">
                                    <h3 className="head">Чорні перевірки:</h3>
                                    <p className="black__cheks head1">
                                        <span>{sheriff.number + ')'} {sheriff.name}</span>{checkArr}</p>
                                </div> : null
                            }
                        </div>
                        {
                            this.state.pointsSum <= 1.0 ?
                                <div>
                                    <button onClick={this.sendPoints} className='green'>Відправити бали й вийти</button>
                                </div>
                                : <p className='errorMessage'>Невірно розставлені додаткові бали <br/>
                                    Максимальна сума має бути не більше 1</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        resultGame: state.resultGame,
        roles: state.roles
    }
};

export default connect(mapStateToProps, {setResultGame})(ResultGame);