import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Provider } from "./Context/Context";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
