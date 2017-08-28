import React from 'react';
import {createStore} from 'redux'
import uuid from 'uuid';
import {Provider, connect} from 'react-redux'

import {Tab} from '../PresentationalComponents'

function reducer(state = [
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
    mapStateToTabProps,
    mapDispatchToTabProps
)(Tab);


const WrappedGames = () => (
    <Provider store={store}>
        <Games/>
    </Provider>
);

export default WrappedGames;