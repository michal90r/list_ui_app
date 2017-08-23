import React from 'react';
import {createStore} from 'redux'
import uuid from 'uuid';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import './App.css';

function gamesReducer(state, action) {
    if (action.type === 'ADD_GAME') {
        const newGame = {
            title: action.title,
            id: uuid.v4(),
        };
        return {
            games: state.games.concat(newGame),
        };
    } else if (action.type === 'DELETE_GAME') {
        return {
            games: state.games.filter((game) => (
                game.id !== action.id
            ))
        };
    } else {
        return state;
    }
}

function seriesReducer(state, action) {
    if (action.type === 'ADD_SERIES') {
        const newSeries = {
            title: action.title,
            id: uuid.v4(),
        };
        return {
            tvSeries: state.tvSeries.concat(newSeries),
        };
    } else if (action.type === 'DELETE_SERIES') {
        return {
            tvSeries: state.tvSeries.filter((series) => (
                series.id !== action.id
            ))
        };
    } else {
        return state;
    }
}

function moviesReducer(state, action) {
    if (action.type === 'ADD_MOVIE') {
        const newMovie = {
            title: action.title,
            id: uuid.v4(),
        };
        return {
            movies: state.movies.concat(newMovie),
        };
    } else if (action.type === 'DELETE_MOVIE') {
        return {
            movies: state.movies.filter((movie) => (
                movie.id !== action.id
            ))
        };
    } else {
        return state;
    }
}

const initialGamesState = {
    games: [
        {
            title: 'Divinity',
            id: uuid.v4,
        }
    ]
};

const initialSeriesState = {
    tvSeries: [
        {
            title: 'Better call Soul',
            id: uuid.v4
        }
    ],
};

const initialMoviesState = {
    movies: [
        {
            title: 'Baby driver',
            id: uuid.v4,
        }
    ],
};

const gamesStore = createStore(gamesReducer, initialGamesState);
const seriesStore = createStore(seriesReducer, initialSeriesState);
const moviesStore = createStore(moviesReducer, initialMoviesState);


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
        const games = gamesStore.getState().games;

        return (
            <div>
                <h1>Games</h1>
                <GamesView games={games}/>
                <GamesInput/>
            </div>
        );
    }
}


class GamesView extends React.Component {
    handleClick = (id) => {
        gamesStore.dispatch({
            type: 'DELETE_GAME',
            id: id,
        });
    };

    render() {
        const games = this.props.games.map((game, index) => (
            <div
                key={index}
                onClick={() => this.handleClick(game.id)}
            >
                {game.title}
            </div>
        ));
        return (
            <div>
                {games}
            </div>
        );
    }
}


class GamesInput extends React.Component {
    state = {
        value: '',
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    handleSubmit = () => {
        gamesStore.dispatch({
            type: 'ADD_GAME',
            title: this.state.value,
        });
        this.setState({
            value: '',
        });
    };

    render() {
        return (
            <div>
                <h2>Games Input</h2>
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

class Series extends React.Component {
    componentDidMount() {
        seriesStore.subscribe(() => this.forceUpdate());
    }

    render() {
        const tvSeries = seriesStore.getState().tvSeries;

        return (
            <div>
                <h1>Series</h1>
                <SeriesView tvSeries={tvSeries}/>
                <SeriesInput/>
            </div>
        );
    }
}


class SeriesView extends React.Component {
    handleClick = (id) => {
        seriesStore.dispatch({
            type: 'DELETE_SERIES',
            id: id,
        });
    };

    render() {
        const tvSeries = this.props.tvSeries.map((series, index) => (
            <div
                key={index}
                onClick={() => this.handleClick(series.id)}
            >
                {series.title}
            </div>
        ));
        return (
            <div>
                {tvSeries}
            </div>
        );
    }
}


class SeriesInput extends React.Component {
    state = {
        value: '',
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    handleSubmit = () => {
        seriesStore.dispatch({
            type: 'ADD_SERIES',
            title: this.state.value,
        });
        this.setState({
            value: '',
        });
    };

    render() {
        return (
            <div>
                <h2>Series Input</h2>
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

class Movies extends React.Component {
    componentDidMount() {
        moviesStore.subscribe(() => this.forceUpdate());
    }

    render() {
        const movies = moviesStore.getState().movies;

        return (
            <div>
                <h1>Movies</h1>
                <MoviesView movies={movies}/>
                <MoviesInput/>
            </div>
        );
    }
}


class MoviesView extends React.Component {
    handleClick = (id) => {
        moviesStore.dispatch({
            type: 'DELETE_MOVIE',
            id: id,
        });
    };

    render() {
        const movies = this.props.movies.map((movie, index) => (
            <div
                key={index}
                onClick={() => this.handleClick(movie.id)}
            >
                {movie.title}
            </div>
        ));
        return (
            <div>
                {movies}
            </div>
        );
    }
}


class MoviesInput extends React.Component {
    state = {
        value: '',
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        })
    };

    handleSubmit = () => {
        moviesStore.dispatch({
            type: 'ADD_MOVIE',
            title: this.state.value,
        });
        this.setState({
            value: '',
        });
    };

    render() {
        return (
            <div>
                <h2>Movies Input</h2>
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
