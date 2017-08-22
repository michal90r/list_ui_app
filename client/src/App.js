import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import './App.css';


const App = () => (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to='/games'>
                        <code>games</code>
                    </Link>
                </li>
                <li>
                    <Link to='/series'>
                        <code>series</code>
                    </Link>
                </li>
                <li>
                    <Link to='/movies'>
                        <code>movies</code>
                    </Link>
                </li>
            </ul>

            <hr/>
            <Switch>
                <Route exact path='/' component={Games}/>
                <Route path='/games' component={Games}/>
                <Route path='/series' component={Series}/>
                <Route path='/movies' component={Movies}/>
            </Switch>
        </div>
    </Router>
);


const Games = () => (
    <div>
        <h1>Games</h1>
    </div>
);

const Series = () => (
    <div>
        <h1>Series</h1>
    </div>
);

const Movies = () => (
    <div>
        <h1>Movies</h1>
    </div>
);


export default App;
