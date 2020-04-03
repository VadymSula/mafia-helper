import React from 'react';
import './App.css';
import GameComponent from "./components/game/game";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, Link
} from "react-router-dom";
import MainPage from "./components/MainPage/mainPage";
import GuidesPage from "./components/GuidesPage/guidesPage";

function App() {
    return (
        <div className="App">
            <Router>

                <Switch>
                    <Route path="/game">
                        <GameComponent/>
                    </Route>
                    <Route path="/">
                        <Navigation/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

function Navigation() {
    return (
            <nav className="header__nav">
                <ul>
                    <div>
                        <li><Link className="nav" to="/">Головна</Link></li>
                        <li><Link className="nav" to="/rules">Правила</Link></li>
                        <li><Link className="nav" to="/rating">Рейтинг</Link></li>
                        <li><Link className="nav" to="/guides">Посібник</Link></li>
                    </div>
                    <li className="login__button"><Link to="#" className="head__button__login ">Логін</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/guides">
                        <GuidesPage/>
                    </Route>
                    <Route path="/">
                        <MainPage/>
                    </Route>
                </Switch>
            </nav>
    )
}

export default App;
