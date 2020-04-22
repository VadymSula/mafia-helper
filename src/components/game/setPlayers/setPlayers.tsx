import React, {Component} from "react";
import {connect} from "react-redux";
import {setArrayPlayers, startGame} from "../../../store/actions";
import RenderPlayer from "./renderPlayer";
import {API} from "../../../servise/apiServise";

interface Props {
    startGame: any,
    player: any,
    setArrayPlayers: any
}

interface State {
    isHidden: boolean
}

class SetPlayers extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }

    upd = () => {
        let countNotReady = 0;
        for (let i = 1; i <= 10; i++) {
            if (this.props.player['player' + i].ready === false)
                countNotReady++;
        }
        if (countNotReady === 0) {
            let roles = {
                civil: 0,
                mafia: 0,
                don: 0,
                sheriff: 0
            }, arrayRoles;
            arrayRoles = document.getElementsByClassName('ChangeRole')[0];
            console.log(arrayRoles)
            // arrayRoles.map(item => {
            //     console.log(item)
            // })
            this.props.startGame(true);
        } else
            alert(countNotReady + " players not ready :(")
    };

    componentDidMount() {
        // API.getAllPlayers().then(response => {
        //     this.props.setArrayPlayers(response)
        // });
        this.props.setArrayPlayers([
            {
                name: "amarsik1",
                id: 1
            },
            {
                name: "Sula",
                id: 2
            },
            {
                name: "Zalypa",
                id: 3
            },
            {
                name: "Danila",
                id: 4
            },
            {
                name: "Danila-Durak",
                id: 5
            },
            {
                name: "amarsik1",
                id: 6
            },
            {
                name: "Sula",
                id: 7
            },
            {
                name: "Zalypa",
                id: 8
            },
            {
                name: "Danila",
                id: 9
            },
            {
                name: "Danila-Durak",
                id: 10
            },
        ])
    }

    componentDidUpdate() {
        let countRoles = {
                civil: 0,
                mafia: 0,
                don: 0,
                sheriff: 0
            },
            players = [
                this.props.player.player1,
                this.props.player.player2,
                this.props.player.player3,
                this.props.player.player4,
                this.props.player.player5,
                this.props.player.player6,
                this.props.player.player7,
                this.props.player.player8,
                this.props.player.player9,
                this.props.player.player10,
            ],
            isGood = false;

        players.map(player => {
            if (player.role)
                countRoles[player.role]++
        });
        if (countRoles.civil === 6 && countRoles.mafia === 2 && countRoles.sheriff === 1 && countRoles.don === 1)
            isGood = true;
        else
            isGood = false;


        if (this.state.isHidden && isGood)
            this.setState({isHidden: false});
        else if (!this.state.isHidden && !isGood)
            this.setState({isHidden: true})

    }

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
                {this.state.isHidden ?
                    <h2 style={{color:"#a4a4a4", userSelect:"none"}}>Виставте правильно ролі</h2>
                    :<button className="game__start" onClick={this.upd}>Почати</button>
                }
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
    setArrayPlayers
};
export default connect(mapStateToProps, mapDispatchToProps)(SetPlayers)