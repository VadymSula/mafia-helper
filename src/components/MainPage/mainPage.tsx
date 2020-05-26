import React, {Component} from "react";
import "./mainPage.css";
import {Link} from "react-router-dom";
import GuidesPage from "../GuidesPage/guidesPage";

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
                <GuidesPage/>
            </div>
        )
    }
}

export default MainPage;