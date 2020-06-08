import React, {Component} from "react";
import ResultGame from "../ResultGame/resultGame";

interface Props {
    game: {
        winner: string,
        gameDuration: string,
        date: string
    }
}

class GameBlock extends Component<Props> {

    render() {
        return (
            <div className="contanier table">
                <div className="line">
                    <p>{this.props.game.date}</p>
                </div>
                <div className="winner">
                    <p className={this.props.game.winner}>{this.props.game.winner}</p>
                </div>
                <div className="line">
                    <p>{this.props.game.gameDuration}</p>
                </div>
                <button className="purple">Докладніше</button>
            </div>
        )
    }
}

export default GameBlock;