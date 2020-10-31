import React from "react";

const Card = ({ user }) => {
  const { name, login, bio, location, avatar_url } = user;
  return (
    <div style={{ display: "flex", margin: "auto" }} className="card-parent">
      <div style={{ height: "590px", width: "550px" }} className="card">
        <a href={`https://github.com/${login}`}>
          <img
            width="425px"
            height="300px"
            style={{ borderRadius: "28px", marginTop: "2px" }}
            src={avatar_url}
            alt={login}
          />
        </a>
        <h1>Name: {name}</h1>
        <p>Username: {login}</p>
        <p>User Bio: {bio}</p>
        <p>User Location: {location}</p>
      </div>
    </div>
  );
};

export default Card;
