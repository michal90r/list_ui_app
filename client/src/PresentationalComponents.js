import React from 'react';

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

export {Tab};