import React from "react";
import { Consumer } from "../Context/Context";
import { withRouter } from 'react-router-dom';
import './App.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.location.state,
            email: '',
            password: '',
            login: 'false',
        };
    }

    handleClick(e) {
        e.preventDefault();
        const id = this.state.email;
        const pass = this.state.password;
        this.state.list.map((t) => {
            if (t.email.toLowerCase() === id && t.password === pass) {
                console.log('id : ', t.email);
                console.log('pass :', t.password);
                this.setState({ login: 'true' })
                console.log('this happend:', this.state.login);
                const { history } = this.props;
                if (history) history.push({
                    pathname: '/dashboard',
                    state: this.state.email
                });
            }
        })

    }

    render() {
        return (
            <div className="App">
                {/* <Consumer>
                    {
                        (context) => (
                            <div>
                                {console.log('hellllllllllo1 : ', context)}
                            </div>
                        )
                    }
                </Consumer> */}
                {console.log("lelelelel : ", this.state.list)}
                <h1>Login Here</h1>
                <p>
                    <input placeholder='email'
                        onChange={(e) =>
                            this.setState({ email: e.target.value })}>
                    </input>
                </p>
                <p>
                    <input placeholder='password'
                        onChange={(e) =>
                            this.setState({ password: e.target.value })}>
                    </input>
                </p>
                <button onClick={(e) => {
                    this.state.login = 'false'
                    this.handleClick(e)
                }}>login</button>
                <p>
                    {this.state.list.map(t => (
                        <p>{t.email} and {t.password}</p>
                    ))}
                </p>
                <h2>status:{this.state.login}</h2>
            </div>
        );
    }
}

export default withRouter(Login);