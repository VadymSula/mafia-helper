import React, {Component} from "react";
import "./game.css";
import SetPlayers from "./setPlayers/setPlayers";
import {connect} from "react-redux";
import InGame from "./inGame/inGame";
import ResultGame from "../ResultGame/resultGame";

interface Props {
    gameIsStarted: boolean,
    gameIsEnd: boolean
}

class GameComponent extends Component<Props> {

    render() {
        let {gameIsStarted} = this.props;
        let {gameIsEnd} = this.props;
        if (gameIsStarted) {
            if (gameIsEnd)
                return (
                    <div className="gameElement">
                        <ResultGame/>
                    </div>
                );
            else
                return (
                    <div className="gameElement">
                        <InGame/>
                    </div>
                )
        } else
            return (
                <div className="gameElement">
                    <SetPlayers/>
                </div>
            )
    }
}

const mapStateToProps = function (state) {
    return {
        gameIsStarted: state.startGame,
        gameIsEnd: state.gameIsEnd
    }
};

export default connect(mapStateToProps, {})(GameComponent);