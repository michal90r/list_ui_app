import React from 'react';
import {createStore} from 'redux'
import uuid from 'uuid';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {Provider, connect} from 'react-redux'

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
                        <Route exact path='/' component={WrappedGames}/>
                        <Route path='/games' component={WrappedGames}/>
                        <Route path='/series' component={WrappedSeries}/>
                        <Route path='/movies' component={WrappedMovies}/>
                    </Switch>
                </div>
            </Router>
        )
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


const mapGamesStateToTabProps = (state) => {
    return {
        rows : state
    };
};

const mapGamesDispatchToTabProps = (dispatch) => (
    {
        onTrashClick: (id) => (
            dispatch({
                type: 'DELETE_GAME',
                id: id,
            })
        ),
        onTitleSubmit: (title) => (
            dispatch({
                type: 'ADD_GAME',
                title: title,
            })
        )
    }
);

const Games = connect(
    mapGamesStateToTabProps,
    mapGamesDispatchToTabProps
)(Tab);

const WrappedGames = () => (
    <Provider store={gamesStore}>
        <Games/>
    </Provider>
);

const mapSeriesStateToTabProps = (state) => {
    return {
        rows : state
    };
};

const mapSeriesDispatchToTabProps = (dispatch) => (
    {
        onTrashClick: (id) => (
            dispatch({
                type: 'DELETE_SERIES',
                id: id,
            })
        ),
        onTitleSubmit: (title) => (
            dispatch({
                type: 'ADD_SERIES',
                title: title,
            })
        )
    }
);

const Series = connect(
    mapSeriesStateToTabProps,
    mapSeriesDispatchToTabProps
)(Tab);

const WrappedSeries = () => (
    <Provider store={tvSeriesStore}>
        <Series/>
    </Provider>
);


const mapMoviesStateToTabProps = (state) => {
    return {
        rows : state
    };
};

const mapMoviesDispatchToTabProps = (dispatch) => (
    {
        onTrashClick: (id) => (
            dispatch({
                type: 'DELETE_MOVIE',
                id: id,
            })
        ),
        onTitleSubmit: (title) => (
            dispatch({
                type: 'ADD_MOVIE',
                title: title,
            })
        )
    }
);

const Movies = connect(
    mapMoviesStateToTabProps,
    mapMoviesDispatchToTabProps
)(Tab);

const WrappedMovies = () => (
    <Provider store={moviesStore}>
        <Movies/>
    </Provider>
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
