import React, { Component } from "react";
import "../App.css";
import AuthService from "../services/auth";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

class Register extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    email: "",
    imageSrc: "",
    file: "",
  };

  fileList = [];

  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;

    this.fileList = event.target.files;

    this.setState({
      [name]: event.target.value,
    });
  }

  register = () => {
    AuthService.register(this.state)
      .then((res) => {
        toast("Registration successful!");
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData();

    if (this.fileList == null) {
      this.register();
    } else if (this.fileList.length > 0) {
      let file = this.fileList[0];
      formData.append("file", file, file.name);
      AuthService.upload(formData)
        .then((res) => {
          this.setState({
            imageSrc: res.data.src,
          });

          this.register();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    const user = this.state;

    return (
      <div className="row mt-5 text-light">
        <div className="col"></div>
        <div className="col">
          <h2>Registration</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Enter name"
                value={user.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="usernameInput">Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Enter username"
                value={user.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Enter password"
                value={user.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter email address"
                value={user.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fileInput">Profile image</label>
              <input
                name="file"
                type="file"
                className="form-control-file"
                id="fileInput"
                value={user.file}
                onChange={this.handleChange}
              />
            </div>
            <button name="submit" type="submit" className="react-cyan-bg btn">
              Submit
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    );
  }
}

export default Register;
