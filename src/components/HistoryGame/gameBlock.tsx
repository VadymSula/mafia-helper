import React, {Component} from "react";

interface Props {
    game: any
}

class GameBlock extends Component<Props> {
    render() {
        let date = Date.parse(this.props.game.date);
        return (
            <div className="contanier table">
                {/*<div className="line">*/}
                {/*    <p>{date}</p>*/}
                {/*</div>*/}
                <div className="winner">
                    <p className={this.props.game.win}>{this.props.game.win}</p>
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