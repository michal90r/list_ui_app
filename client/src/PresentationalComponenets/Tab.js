import React from 'react';

import NewTitleForm from '../PresentationalComponenets/NewTitleForm'
import TitleList from '../PresentationalComponenets/TitleList'

import '../App.css';


const Tab = (props) => (
    <div>
        <h1>{props.title}</h1>
        <div id="formWrapper">
            <NewTitleForm
                onSubmit={props.onFormSubmit}
            />
        </div>
        <div id="listWrapper">
            <TitleList
                rows={props.rows}
                onClick={props.onDeleteClick}
            />
        </div>
    </div>
);

export {Tab};