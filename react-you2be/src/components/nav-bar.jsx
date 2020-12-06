import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faVideo, faUsers } from "@fortawesome/free-solid-svg-icons";

class NavBar extends Component {
  state = {
    query: "",
  };

  bindQuery = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  search(event) {
    event.preventDefault();
  }

  renderNavButtons() {
    const user = this.props.currentUser;

    if (user != null) {
      return (
        <div className="navbar-nav ml-auto">
          <a className="nav-item nav-link active">
            <img src={user.imageSrc} className="circleSmall" />
          </a>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <b>{user.name}</b>
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link to={`/profile/${user.id}`} className="dropdown-item">
                <FontAwesomeIcon className="mr-1" icon={faUser} /> Profile
              </Link>
              <Link to="/my-videos" className="dropdown-item">
                <FontAwesomeIcon className="mr-1" icon={faVideo} /> My Videos
              </Link>
              <Link className="dropdown-item" to="/subscriptions">
                <FontAwesomeIcon className="mr-1" icon={faUsers} />{" "}
                Subscriptions
              </Link>
              <div className="dropdown-divider"></div>
              <Link
                to="/login"
                onClick={this.props.logout}
                className="dropdown-item"
              >
                Log out
              </Link>
            </div>
          </li>
        </div>
      );
    }

    return (
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/login" className="nav-item nav-link">
            Log in
          </Link>
          <Link to="/register" className="nav-item nav-link">
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light react-cyan-bg">
        <span className="react-logo">
          <span className="nucleo"></span>
        </span>
        <Link to="/" className="navbar-brand ml-5">
          You2be
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {this.renderNavButtons()}

        <form onSubmit={this.search} className="form-inline ml-5">
          <input
            onChange={this.bindQuery}
            className="form-control mr-sm-2 bg-dark text-light"
            name="query"
            type="text"
            value={this.state.query}
            placeholder="Search..."
          />
          <Link
            to={"/search/" + this.state.query}
            className="btn btn-outline-dark my-2 my-sm-0"
          >
            Search
          </Link>
        </form>
      </nav>
    );
  }
}

export default NavBar;
