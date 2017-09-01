import React from 'react';
import {createStore} from 'redux'
import uuid from 'uuid';
import {Provider, connect} from 'react-redux'

import {Tab} from '../PresentationalComponenets/Tab'

function reducer(state = [
    {
        title: 'Divinity: Original Sin II',
        releaseDay: '14/09/2017',
        comment: 'PC',
        id: uuid.v4,
    },
], action) {
    switch (action.type) {
        case 'ADD_GAME': {
            const newGame = {
                title: action.title,
                releaseDay: action.releaseDay,
                comment: action.comment,
                id: uuid.v4()
            };
            return [newGame].concat(state);
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

function addGame(title, releaseDay, comment) {
    return {
        type: 'ADD_GAME',
        title: title,
        releaseDay: releaseDay,
        comment: comment
    };
}

function deleteGame(id) {
    return {
        type: 'DELETE_GAME',
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
            dispatch(deleteGame(id))
        ),
        onFormSubmit: (e) => (
            dispatch(addGame(e.title, e.releaseDay, e.comment))
        )
    }
);

const Games = connect(
    mapStateToTabProps,
    mapDispatchToTabProps
)(Tab);


const WrappedGames = () => (
    <Provider store={store}>
        <Games/>
    </Provider>
);

export default WrappedGames;