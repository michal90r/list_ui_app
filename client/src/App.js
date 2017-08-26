import React from 'react';
import {createStore} from 'redux'
import uuid from 'uuid';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import './App.css';


function gamesReducer(state = [
    {
        title: 'Divinity',
        id: uuid.v4,
    },
], action) {
    switch (action.type) {
        case 'ADD_GAME': {
            const newGame = {
                title: action.title,
                id: uuid.v4()
            };
            return state.concat(newGame);
        }
        case 'DELETE_GAME': {
            return state.filter((game) => (
                game.id !== action.id
            ))
        }
        default: {
            return state
        }
    }
}

function tvSeriesReducer(state = [
    {
        title: 'Better call Soul',
        id: uuid.v4
    }
], action) {
    switch (action.type) {
        case 'ADD_SERIES': {
            const newSeries = {
                title: action.title,
                id: uuid.v4()
            };
            return state.concat(newSeries);
        }
        case 'DELETE_SERIES': {
            return state.filter((series) => (
                series.id !== action.id
            ))
        }
        default: {
            return state
        }
    }
}

function moviesReducer(state = [
    {
        title: 'Baby driver',
        id: uuid.v4,
    }
], action) {
    switch (action.type) {
        case 'ADD_MOVIE': {
            const newMovie = {
                title: action.title,
                id: uuid.v4()
            };
            return state.concat(newMovie);

        }
        case 'DELETE_MOVIE': {
            return state.filter((movie) => (
                movie.id !== action.id
            ))
        }
        default: {
            return state
        }
    }
}


const gamesStore = createStore(gamesReducer);
const tvSeriesStore = createStore(tvSeriesReducer);
const moviesStore = createStore(moviesReducer);


class App extends React.Component {

    render() {
        return (
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
        )
    }
}


class Games extends React.Component {
    componentDidMount() {
        gamesStore.subscribe(() => this.forceUpdate());
    }

    render() {
        const games = gamesStore.getState();

        return (
            <Tab
                title={this.constructor.name}
                rows={games}
                onTrashClick={(id) => (
                    gamesStore.dispatch({
                        type: 'DELETE_GAME',
                        id: id,
                    })
                )}
                onTitleSubmit={(title) => (
                    gamesStore.dispatch({
                        type: 'ADD_GAME',
                        title: title,
                    })
                )}
            />
        );
    }
}


class Series extends React.Component {
    componentDidMount() {
        tvSeriesStore.subscribe(() => this.forceUpdate());
    }

    render() {
        const tvSeries = tvSeriesStore.getState();

        return (
            <Tab
                title={this.constructor.name}
                rows={tvSeries}
                onTrashClick={(id) => (
                    tvSeriesStore.dispatch({
                        type: 'DELETE_SERIES',
                        id: id,
                    })
                )}
                onTitleSubmit={(title) => (
                    tvSeriesStore.dispatch({
                        type: 'ADD_SERIES',
                        title: title,
                    })
                )}
            />
        );
    }
}



class Movies extends React.Component {
    componentDidMount() {
        moviesStore.subscribe(() => this.forceUpdate());
    }

    render() {
        const movies = moviesStore.getState();

        return (
            <Tab
                title={this.constructor.name}
                rows={movies}
                onTrashClick={(id) => (
                    moviesStore.dispatch({
                        type: 'DELETE_MOVIE',
                        id: id,
                    })
                )}
                onTitleSubmit={(title) => (
                    moviesStore.dispatch({
                        type: 'ADD_MOVIE',
                        title: title,
                    })
                )}
            />
        );
    }
}

const Tab = (props) => (
    <div>
        <h1>{props.title}</h1>
        <TitleList
            rows={props.rows}
            onClick={props.onTrashClick}
        />
        <TitleFieldSubmit
            onSubmit={props.onTitleSubmit}
        />
    </div>
);

const TitleList = (props) => (
    <div>
        {
            props.rows.map((row, index) => (
                <div
                    key={index}
                    onClick={() => props.onClick(row.id)}
                >
                    <div>
                        {row.title}
                    </div>
                </div>
            ))
        }
    </div>
);


class TitleFieldSubmit extends React.Component {
    state = {
        value: '',
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.value);
        this.setState({
            value: '',
        });
    };

    render() {
        return (
            <div>
                <input
                    onChange={this.onChange}
                    value={this.state.value}
                    type='text'
                />
                <button
                    onClick={this.handleSubmit}
                    type="submit"
                >
                    Submit
                </button>
            </div>
        );
    }

}


export default App;
