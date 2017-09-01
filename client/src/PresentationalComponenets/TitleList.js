import React from 'react';

import DeleteImg from '../assets/delete.svg'

import '../App.css';

const TitleList = (props) => (
    <div>
        {
            props.rows.map((row, index) => (
                <div
                    className="row"
                    key={index}
                >
                    <div>
                        <div className="titleCol">{row.title}</div>
                        <div className="releaseCol">{row.releaseDay}</div>
                        <div className="commentCol">{row.comment}</div>
                        <div
                            className="iconCol"
                            onClick={() => props.onClick(row.id)}
                        >
                            <img
                                className="deleteImg"
                                alt="delete"
                                src={DeleteImg}
                            />
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
);

export default TitleList;