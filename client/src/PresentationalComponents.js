import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'

import './App.css';

const TitleList = (props) => (
    <div>
        {
            props.rows.map((row, index) => (
                <div
                    className="row"
                    key={index}
                    onClick={() => props.onClick(row.id)}
                >
                    <div>
                        <div className="titleCol">{row.title}</div>
                        <div className="releaseCol">{row.releaseDay}</div>
                        <div className="commentCol">{row.comment}</div>
                    </div>
                </div>
            ))
        }
    </div>
);

class Field extends React.Component {
    static propTypes = {
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        validate: PropTypes.func,
        onChange: PropTypes.func.isRequired,
    };

    state = {
        value: this.props.value,
        error: false,
    };

    componentWillReceiveProps(update) {
        this.setState({value: update.value});
    }

    onChange = (evt) => {
        const name = this.props.name;
        const value = evt.target.value;
        const error = this.props.validate ? this.props.validate(value) : false;

        this.setState({value, error});

        this.props.onChange({name, value, error});
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.onChange}
                    maxLength={20}
                    className={this.state.error && "errorMark"}
                />
            </div>
        );
    }
}

class TitleFieldSubmit extends React.Component {
    state = {
        fields: {
            title: "",
            releaseDay: "",
            comment: "",
        },
        fieldErrors: {},
    };

    onInputChange = ({name, value, error}) => {
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name] = value;
        fieldErrors[name] = error;

        this.setState({fields, fieldErrors});
    };

    onFormSubmit = (e) => {
        e.preventDefault();

        if (this.validate()) return;

        this.props.onSubmit(this.state.fields);
        this.setState({
            fields: {
                title: "",
                releaseDay: "",
                comment: "",
            },
        });
    };

    validate = () => {
        const row = this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k]);

        if (!row.title) return true;
        if (errMessages.length) return true;

        return false;
    };

    isValidDate = (val) => {
        return val === "" ? true : moment(val, "DD/MM/YYYY", true).isValid();
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <Field
                        placeholder="Title"
                        name="title"
                        value={this.state.fields.title}
                        onChange={this.onInputChange}
                        validate={(val) => (val ? false : 'Title Required')}
                    />

                    <br/>

                    <Field
                        placeholder="Release day, dd/mm/yyyy"
                        name="releaseDay"
                        value={this.state.fields.releaseDay}
                        onChange={this.onInputChange}
                        validate={(val) => (this.isValidDate(val) ? false : 'Invalid Date')}
                    />

                    <br/>

                    <Field
                        placeholder="Comment"
                        name="comment"
                        value={this.state.fields.comment}
                        onChange={this.onInputChange}
                    />

                    <button type="submit" disabled={this.validate()}>
                        >
                    </button>
                </form>
            </div>
        );
    }

}

const Tab = (props) => (
    <div>
        <h1>{props.title}</h1>
        <div className="formWrapper">
            <TitleFieldSubmit
                onSubmit={props.onFormSubmit}
            />
        </div>
        <div className="listWrapper">
            <TitleList
                rows={props.rows}
                onClick={props.onTrashClick}
            />
        </div>
    </div>
);

export {Tab};