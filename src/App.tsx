import React from 'react';
import './App.css';
import GameComponent from "./components/game/game";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MainPage from "./components/MainPage/mainPage";
import HistoryPage from "./components/HistoryGame/historyPage";
import RatingPage from './components/RatingPage/RatingPage';

function App() {
    return (
        <div className="App">
            <Router>

                <Switch>
                    <Route path="/game">
                        <GameComponent />
                    </Route>
                    <Route path="/">
                        <Navigation />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

function Navigation() {
    return (
        <nav className="header__nav MainPage ">
            <ul>
                <div>
                    <li><Link className="nav" to="/">Головна</Link></li>
                    <li><a className="nav" href="#news">Новини</a></li>
                    <li><Link className="nav" to="/rating">Рейтинг</Link></li>
                    <li><Link className="nav" to="/history">Історія ігор</Link></li>
                </div>
                <li className="login__button"><Link to="#" className="head__button__login ">Логін</Link>
                </li>
            </ul>
            <Switch>
                <Route path="/history">
                    <HistoryPage />
                </Route>
                <Route path="/rating">
                    <RatingPage />
                </Route>
                <Route path="/">
                    <MainPage />
                </Route>
            </Switch>
        </nav>
    )
}

export default App;
