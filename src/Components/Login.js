import React from "react";
import { Consumer } from "../Context/Context";
import './App.css';

class Login extends React.Component {
    render() {
        return (
            <div className="App">
                <Consumer>
                    {
                        (context) => (
                            <div>
                                {console.log('hellllllllllo1 : ', context)}
                            </div>
                        )
                    }
                </Consumer>
                <h1>Login</h1>
            </div>
        );
    }
}

export default Login;