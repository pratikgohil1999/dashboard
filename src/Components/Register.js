import Button from 'react-bootstrap/Button'
import React from "react";
import { withRouter } from "react-router-dom";
// import { Provider } from "../Context/Context";
import './App.css';


export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            currentName: "",
            currentEmail: "",
            currentPassword: "",
            nameError: "",
            emailError: "",
            passwordError: "",
            currentId: 0,
        };
    }

    validate = () => {
        let nameError = "";
        let emailError = "";
        // let passwordError = "";

        if (!this.state.currentName) {
            nameError = "name cannot be blank";
        }

        if (!this.state.currentEmail.includes("@")) {
            emailError = "invalid email";
        }

        if (emailError || nameError) {
            this.setState({ emailError, nameError });
            return false;
        }

        return true;
    };

    handleName = e => {
        this.setState({
            ...this.state, currentName: e.target.value
        })
    }

    handleEmail = e => {
        this.setState({
            ...this.state, currentEmail: e.target.value
        })
    }

    handlePassword = e => {
        this.setState({
            ...this.state, currentPassword: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        let newId = this.state.currentId;
        newId = newId + 1;
        this.setState({
            currentId: newId
        })

        const isValid = this.validate();
        if (isValid) {
            console.log("current id,", this.state.currentId);
            const nameHere = this.state.currentName;
            const emailHere = this.state.currentEmail;
            const passwordHere = this.state.currentPassword;
            const idHere = this.state.currentId;
            this.setState({
                ...this.state, list: [
                    ...this.state.list, {
                        name: nameHere,
                        email: emailHere,
                        password: passwordHere,
                        id: idHere
                    },
                ],
                nameError: "",
                emailError: "",
                passwordError: "",
                currentId: this.state.currentId + 1,
            });

        }
    };

    handleClick = (e) => {
        const { history } = this.props;
        if (history) history.push({
            pathname: '/login',
            state: this.state.list
        });
    }


    render() {
        // const mycontext = {
        //     data: this.state.list
        // }
        return (
            // <Provider
            //     value={mycontext, console.log('hellow:', mycontext)}>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h1>Sign Up Here</h1>
                    <input
                        name="name"
                        placeholder="name"
                        value={this.state.currentName}
                        onChange={this.handleName}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.nameError}
                    </div>
                </div>
                <div>
                    <input
                        name="email"
                        placeholder="email"
                        value={this.state.currentEmail}
                        onChange={this.handleEmail}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.emailError}
                    </div>
                </div>
                <div>
                    <input
                        // type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.currentPassword}
                        onChange={this.handlePassword}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.passwordError}
                    </div>
                </div>
                <h2 />
                <h2 />
                <Button type="submit">Register</Button>
                <Button variant="success" onClick={(e) => this.handleClick(e)}>Go to loginPage</Button>
                {/* {
                    console.log(this.state),
                    this.state.list.map(t => (
                        <div>
                            {t.name}
                        </div>
                    ))
                } */}
                <p>(hint:name shouln't be empty and email must contains "@")</p>
            </form>

            // </Provider >
        );
    }
}

export default withRouter(Register);