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
                        {row.releaseDay}
                        {row.comment}
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

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.value);
        this.setState({
            value: '',
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        onChange={this.onChange}
                        placeholder="title"
                        value={this.state.value}
                        type='text'
                    />
                    <input type="submit"/>
                </form>
            </div>
        );
    }

}

const Tab = (props) => (
    <div>
        <h1>{props.title}</h1>
        <TitleFieldSubmit
            onSubmit={props.onTitleSubmit}
        />
        <TitleList
            rows={props.rows}
            onClick={props.onTrashClick}
        />
    </div>
);

export {Tab};