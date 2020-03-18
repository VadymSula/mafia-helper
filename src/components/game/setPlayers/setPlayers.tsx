import React, {Component} from "react";
import {connect} from "react-redux";
import {startGame} from "../../../store/actions";
import RenderPlayer from "./renderPlayer";

interface Props {
    startGame: any,
    player: any
}

class SetPlayers extends Component<Props> {

    upd = () => {
        let countNotReady = 0;
        for (let i = 1; i <= 10; i++) {
            if (this.props.player['player' + i].ready === false)
                countNotReady++;
        }
        if (countNotReady === 0)
            this.props.startGame(true);
        else
            alert(countNotReady + " players not ready :(")
    };

    render() {
        return (
            <section>
                <h1>Набір гравців</h1>
                <div className="players">
                    <RenderPlayer player={this.props.player.player1} number={1}/>
                    <RenderPlayer player={this.props.player.player2} number={2}/>
                    <RenderPlayer player={this.props.player.player3} number={3}/>
                    <RenderPlayer player={this.props.player.player4} number={4}/>
                    <RenderPlayer player={this.props.player.player5} number={5}/>
                    <RenderPlayer player={this.props.player.player6} number={6}/>
                    <RenderPlayer player={this.props.player.player7} number={7}/>
                    <RenderPlayer player={this.props.player.player8} number={8}/>
                    <RenderPlayer player={this.props.player.player9} number={9}/>
                    <RenderPlayer player={this.props.player.player10} number={10}/>
                </div>
                {

                }
                <button className="game__start" onClick={this.upd}>Почати</button>
            </section>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        player: state,
    }
};
const mapDispatchToProps = {
    startGame,
};
export default connect(mapStateToProps, mapDispatchToProps)(SetPlayers)