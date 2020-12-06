import React, { Component } from "react";
import "../App.css";
import AuthService from "../services/auth";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    AuthService.login(this.state.username, this.state.password)
      .then((res) => {
        this.props.login();
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="row mt-5 text-light">
        <div className="col"></div>
        <div className="col">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input
                value={this.state.username}
                name="username"
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Enter username"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                value={this.state.password}
                name="password"
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Enter password"
                onChange={this.handleChange}
              />
            </div>
            <button name="submit" type="submit" className="react-cyan-bg btn">
              Log in
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    );
  }
}

export default Login;
