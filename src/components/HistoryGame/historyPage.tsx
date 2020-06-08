import React, {Component} from "react";
import "./historyPage.css";
import GameBlock from "./gameBlock";

class HistoryPage extends Component {

    games_tmp = [
        {
            id: 0,
            winner: 'mafia',
            gameDuration: '40:23',
            date: 'вчора'
        },
        {
            id: 1,
            winner: 'city',
            gameDuration: '40:23',
            date: 'вчора'
        },
        {
            id: 2,
            winner: 'draw',
            gameDuration: '40:23',
            date: 'вчора'
        }
    ];

    render() {
        return (
            <div id='history' className="historyPage">
                <header>
                    <div className="name_PAGE margin">
                        <h1>Історія ігор</h1>
                    </div>
                </header>
                <section>
                    <div className="contanier  line_down">
                        <div className="lineHeader">
                            <h3>Дата</h3>
                        </div>
                        <div className="lineHeader">
                            <h3>Переможець</h3>
                        </div>
                        <div className="lineHeader">
                            <h3>Тривалість</h3>
                        </div>
                        <div className="button costul"><i className="fas fa-chevron-down"></i></div>
                    </div>
                    {
                        this.games_tmp.map(game => {
                            return (
                                <GameBlock key={game.id} game={game}/>
                            )
                        })
                    }
                </section>
            </div>
        )
    }
}

export default HistoryPage;