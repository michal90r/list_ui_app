import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import Games from './ContainerComponents/Games'
import Series from './ContainerComponents/Series'
import Movies from './ContainerComponents/Movies'
import './App.css';


class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <div className="header">
                        <ul>
                            <li>
                                <Link to='/games'>
                                    <code id="games">Games</code>
                                </Link>
                            </li>
                            <li>
                                <Link to='/series'>
                                    <code id="series">series</code>
                                </Link>
                            </li>
                            <li>
                                <Link to='/movies'>
                                    <code id="movies">movies</code>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <Switch>
                        <Route exact path='/' component={Games}/>
                        <Route path='/games' component={Games}/>
                        <Route path='/series' component={Series}/>
                        <Route path='/movies' component={Movies}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
