import React, {Component} from "react";
import "./game.css";
import SetPlayers from "./setPlayers/setPlayers";
import {connect} from "react-redux";
import InGame from "./inGame/inGame";

class GameComponent extends Component<{ gameIsStarted: boolean }> {

    render() {
        let {gameIsStarted} = this.props;
        return (
            <div className="gameElement">
                {gameIsStarted ? <InGame/> : <SetPlayers/>}
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        gameIsStarted: state.startGame
    }
};

export default connect(mapStateToProps, {})(GameComponent);