import React from 'react';
import PropTypes from 'prop-types';


import '../App.css';



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
                    maxLength={32}
                    className={this.state.error && "errorMark"}
                />
            </div>
        );
    }
}

export default Field;