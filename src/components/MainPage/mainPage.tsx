import React, {Component} from "react";
import "./mainPage.css";
import {Link} from "react-router-dom";

class MainPage extends Component {

    render() {
        return (
            <div className="MainPage ">
                <header>
                    <div className="header">
                        <div className="head__button__play">
                            <p className="h1">MAFIA</p>
                            <Link className="button" to="/game">Почати гру</Link>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="main__button-icons">
                        <div className="main__button-icon">
                            <Link to="/game">
                                <i className="fas fa-play" style={{width: '200px'}}/>
                                <h5>Почати гру</h5>
                            </Link>
                        </div>
                        <div className="main__button-icon">
                            <Link to="/rules">
                                <i className="fas fa-list-ul"/>
                                <h5>Правила</h5>
                            </Link>
                        </div>
                        <div className="main__button-icon">
                            <Link to="/rating">
                                <i className="fas fa-medal"/>
                                <h5>Рейтинг</h5>
                            </Link>
                        </div>
                        <div className="main__button-icon">
                            <Link to="/guides">
                                <i className="fas fa-book-open"/>
                                <h5>Посібники</h5>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default MainPage;