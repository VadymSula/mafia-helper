import React, {Component} from "react";
import {connect} from "react-redux";
import "./resultGame.css";
import Mafia from "../../assets/images/mafiaWin.png";
import City from "../../assets/images/townWin.png";
import {setResultGame} from "../../store/actions";

interface Props {
    setResultGame: any,
    resultGame: any
}

class ResultGame extends Component<Props> {


    calculateTime(time) {
        let hrs = ~~(time / 3600),
            min = ~~((time) / 60),
            secs = ~~time % 60,
            ret = "";

        ret += "" + hrs + ":" + (min < 10 ? "0" : "");
        ret += "" + min + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;

        return ret;
    }

    render() {
        let game: any;
        if (this.props.resultGame)
            game = this.props.resultGame;
        game.gameDuration = this.calculateTime(game.gameDuration);
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
        let don = {firstKillSheriff: false};
        don = game.playersResult.filter(player => player.roleInGame === 'don')[0];
        // Чорні перевірки шерифа
        let blackChecks: any = [];
        game.checksResult.forEach((check) => {
            if (check.sheriffCheck) {
                if (game.playersResult[check.sheriffCheck - 1].roleInGame === 'mafia' || game.playersResult[check.sheriffCheck - 1].roleInGame === 'don') {
                    blackChecks.push(check.sheriffCheck)
                }
            }
        });
        let checkArr = blackChecks.join('/');
        let sheriff = game.playersResult.filter(player => player.roleInGame === 'sheriff')[0];
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
                        <ol className="player">
                            {game.playersResult.map(player => {
                                return (
                                    <li key={player.id} className={!player.killed ? "" : "disabledPlayer"}>
                                        {player.name}
                                        {
                                            player.roleInGame === 'don' ? <i className="fas fa-user-secret iRole"/> :
                                                player.roleInGame === 'mafia' ?
                                                    <i className="fas fa-crosshairs iRole"/> :
                                                    player.roleInGame === 'sheriff' ?
                                                        <i className="fab fa-empire iRole"/> : null
                                        }
                                    </li>
                                )
                            })}
                        </ol>
                    </div>
                    <div className="column_second">
                        <div className="timer">
                            <h3>
                                <span>Тривалість гри:</span>
                                <span>{game.gameDuration}</span>
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
                                        <div className="divTableRow">
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
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        resultGame: state.resultGame
    }
};

export default connect(mapStateToProps, {setResultGame})(ResultGame);