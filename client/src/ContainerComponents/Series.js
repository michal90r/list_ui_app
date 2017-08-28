import React from 'react';
import {createStore} from 'redux'
import uuid from 'uuid';
import {Provider, connect} from 'react-redux'

import {Tab} from '../PresentationalComponents'

function reducer(state = [
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
            return [newSeries].concat(state);
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
    mapStateToTabProps,
    mapDispatchToTabProps
)(Tab);

const WrappedSeries = () => (
    <Provider store={store}>
        <Series/>
    </Provider>
);

export default  WrappedSeries;