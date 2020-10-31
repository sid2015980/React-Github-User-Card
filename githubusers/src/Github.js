import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

class Github extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "sid2015980",
      userFollowers: [],
      followerData: [],
    };
  }

  apiData = () => {
    axios
      .get(`https://api.github.com/users/${this.state.name}`)
      .then((res) => {
        this.setState({
          followerData: [...this.state.followerData, res.data],
        });
      })
      .catch((err) => console.log(err));

    axios
      .get(`https://api.github.com/users/${this.state.name}/followers`)
      .then((res) => {
        const loginInfo = res.data.map((info) => info.login);
        this.setState({
          userFollowers: loginInfo,
        });
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      this.state.userFollowers.forEach((user) => {
        axios.get(`https://api.github.com/users/${user}`).then((res) => {
          //   console.log(res.data);
          this.setState({
            followerData: [...this.state.followerData, res.data],
          });
        });
      });
    }, 2000);
  };

  componentDidMount() {
    this.apiData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.apiData();
    }
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSetNewUser = () => {
    axios
      .get(`https://api.github.com/users/${this.state.name}`)
      .then((res) => {
        this.setState({
          followerData: [res.data],
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { followerData } = this.state;
    return (
      <div>
        <h1>Github Users</h1>
        <div>
          Username:{" "}
          <input
            type="text"
            value={this.state.newUser}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSetNewUser}>Search</button>
        </div>
        <div className="card-div">
          {followerData.map((user, i) => (
            <Card key={i} user={user} />
          ))}
        </div>
      </div>
    );
  }
}

export default Github;
