import React from 'react';
import {createStore} from 'redux'
import uuid from 'uuid';
import {Provider, connect} from 'react-redux'

import {Tab} from '../PresentationalComponents'

function reducer(state = [
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
            return [newMovie].concat(state);

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

const store = createStore(reducer);


const mapStateToTabProps = (state) => {
    return {
        rows : state
    };
};

const mapDispatchToTabProps = (dispatch) => (
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
    mapStateToTabProps,
    mapDispatchToTabProps
)(Tab);

const WrappedMovies = () => (
    <Provider store={store}>
        <Movies/>
    </Provider>
);

export default WrappedMovies;