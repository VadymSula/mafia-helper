import React from 'react';
import './App.css';
import GameComponent from "./components/game/game";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/game">
                        <GameComponent/>
                    </Route>
                    <Route path="/">
                        <Redirect to="/game"/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
