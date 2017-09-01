import React from 'react';
import {createStore} from 'redux'
import uuid from 'uuid';
import {Provider, connect} from 'react-redux'

import {Tab} from '../PresentationalComponents'

function reducer(state = [
    {
        title: 'Baby driver',
        releaseDay: '',
        comment: '',
        id: uuid.v4,
    }
], action) {
    switch (action.type) {
        case 'ADD_MOVIE': {
            const newMovie = {
                title: action.title,
                releaseDay: action.releaseDay,
                comment: action.comment,
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

function addMovie(title, releaseDay, comment) {
    return {
        type: 'ADD_MOVIE',
        title: title,
        releaseDay: releaseDay,
        comment: comment
    };
}

function deleteMovie(id) {
    return {
        type: 'DELETE_MOVIE',
        id: id,
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
        onDeleteClick: (id) => (
            dispatch(deleteMovie(id))
        ),
        onFormSubmit: (e) => (
            dispatch(addMovie(e.title, e.releaseDay, e.comment))
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