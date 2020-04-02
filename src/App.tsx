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

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/game">
                        <GameComponent/>
                    </Route>
                    <Route path="/">
                        <MainPage/>
                    </Route>
                    <Route path="*">
                        <Link to='/'/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
