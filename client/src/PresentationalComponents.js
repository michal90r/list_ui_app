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
        fields: {
            title: "",
            releaseDay: "",
            comment: "",
        },
        fieldErrors: {},
    };

    onInputChange = (e) => {
        const fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({ fields })
    };

    onFormSubmit = (e) => {
        const row = this.state.fields;
        const fieldErrors = this.validate(row);
        this.setState({ fieldErrors });
        e.preventDefault();

        if (Object.keys(fieldErrors).length) return;

        this.props.onSubmit(this.state.fields);
        this.setState({
            fields: {
                title: "",
                releaseDay: "",
                comment: "",
            },
        });
    };

    validate = (row) => {
        const errors = {};
        if(!row.title) errors.title = "Title Required";
        if(!row.releaseDay && !this.isValidDate(row.releaseDay)) errors.releaseDay = "Invalid Date";
        return errors
    };

    isValidDate = () => (true);

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <input
                        placeholder="title"
                        name="title"
                        value={this.state.fields.title}
                        onChange={this.onInputChange}
                    />

                    <span style={{ color: 'red' }}>{this.state.fieldErrors.title}</span>

                    <br />

                    <input
                        placeholder="release day"
                        name="releaseDay"
                        value={this.state.fields.releaseDay}
                        onChange={this.onInputChange}
                    />

                    <span style={{ color: 'red' }}>{this.state.fieldErrors.releaseDay}</span>

                    <br />

                    <input
                        placeholder="comment"
                        name="comment"
                        value={this.state.fields.comment}
                        onChange={this.onInputChange}
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
            onSubmit={props.onFormSubmit}
        />
        <TitleList
            rows={props.rows}
            onClick={props.onTrashClick}
        />
    </div>
);

export {Tab};