import React, {Component} from "react";
import "./historyPage.css";
import GameBlock from "./gameBlock";
import {API} from "../../servise/apiServise";
import {connect} from 'react-redux';
import {setAllGames} from "../../store/actions";

interface Props {
    setAllGames: any,
    allGames: any
}

class HistoryPage extends Component<Props> {

    componentDidMount(): void {
        API.getAllGames().then(res => {
            this.props.setAllGames(res)
        })
    }

    render() {

        return (
            <div id='history' className="historyPage">
                <header>
                    <div className="name_PAGE margin">
                        <h1>Історія ігор</h1>
                    </div>
                </header>
                <section>

                    {
                        this.props.allGames.lenght > 0 ?
                            <div>
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
                                    <div className="button costul"><i className="fas fa-chevron-down"/></div>
                                </div>
                                {
                                    this.props.allGames.map(game => {
                                        return (
                                            <GameBlock game={game}/>
                                        )
                                    })
                                }
                            </div>:
                            <h2>Історія ігор пуста</h2>
                    }
                </section>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        allGames: state.allGames
    }
};

const mapDispatchToProps = {
    setAllGames
};
export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);