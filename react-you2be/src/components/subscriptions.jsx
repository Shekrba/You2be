import React, { Component } from "react";
import SubService from "../services/sub-service";
import ProfileCard from "./profile-card";

class Subscriptions extends Component {
  state = {
    channelSubs: [],
    mySubscriptions: [],
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    SubService.getSubscriptions()
      .then((res) => {
        this.setState({
          channelSubs: res.data.channelSubs,
          mySubscriptions: res.data.mySubscriptions,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    var channelSubs = this.state.channelSubs;
    var mySubscriptions = this.state.mySubscriptions;

    return (
      <React.Fragment>
        <ul className="nav nav-tabs mt-5" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active react-cyan"
              id="mySubscriptions-tab"
              data-toggle="tab"
              href="#mySubscriptions"
              role="tab"
              aria-controls="mySubscriptions"
              aria-selected="true"
            >
              My subscriptions
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link react-cyan"
              id="channelSubs-tab"
              data-toggle="tab"
              href="#channelSubs"
              role="tab"
              aria-controls="channelSubs"
              aria-selected="false"
            >
              Channel subscribers
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="mySubscriptions"
            role="tabpanel"
            aria-labelledby="mySubscriptions-tab"
          >
            <div className="container mt-5">
              {mySubscriptions.map((profile) => (
                <div key={profile.id} className="row">
                  <div className="col">
                    <ProfileCard profile={profile} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="channelSubs"
            role="tabpanel"
            aria-labelledby="channelSubs-tab"
          >
            <div className="container mt-5">
              <div className="container mt-5">
                {channelSubs.map((profile) => (
                  <div key={profile.id} className="row">
                    <div className="col">
                      <ProfileCard profile={profile} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Subscriptions;
