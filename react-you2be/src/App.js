import './App.css';
import NavBar from './components/nav-bar';
import Home from './components/home';
import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import VideoPlayer from './components/video-player';
import Register from './components/register'
import { ToastContainer } from "react-toastify";
import Login from "./components/login";
import AuthService from "./services/auth"
import VideoUpload from './components/video-upload';
import MyVideos from './components/my-videos';
import SearchResults from './components/search-results';
import VideoEdit from './components/video-edit';
import Subscriptions from './components/subscriptions';
import UserProfile from './components/user-profile';
import { ProtectedRoute } from './guard/protected-route';

class App extends Component {

  state = {
    user:AuthService.getCurrentUser(),
  }

  handleLogin = () => {
    const currentUser = AuthService.getCurrentUser();
    this.setState({user:currentUser});
  }

  handleLogout = () => {
    AuthService.logout();
    this.setState({user:null});
  }

  render(){
    return (
    <Router>
      <NavBar logout={this.handleLogout} currentUser={this.state.user}/>
      <ToastContainer/>
      <main className="container">  
        <Switch>
          <ProtectedRoute path = "/subscriptions" component={Subscriptions}  user={this.state.user} />
          <Route path = "/profile/:id" render={(props) => (<UserProfile {...props} user={this.state.user} />)} />
          <ProtectedRoute path = "/my-videos/upload" component={VideoUpload} />
          <ProtectedRoute path = "/my-videos" component={MyVideos} />
          <Route path = "/search/:query" render={(props) => (<SearchResults {...props} user={this.state.user} />)}/>
          <ProtectedRoute path = "/video/:id/edit" component={VideoEdit}/>
          <Route path = "/video/:id" render={(props) => (<VideoPlayer {...props} currentUser={this.state.user} />)}/>
          <Route path = "/register" component={Register}/>
          <Route path = "/login" render={(props) => (<Login {...props} login={this.handleLogin} />)} />
          <Route path = "/" component={Home}/>
        </Switch>
      </main>
    </Router>
  );
  }
}

export default App;
