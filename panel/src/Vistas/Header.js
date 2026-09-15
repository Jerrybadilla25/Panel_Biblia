import React from "react";

export default function Header(props) {
  return (
    <div className="jumbotron">
      <div className="pb-hero">
        <div className="pb-hero__text">
          <h1 className="display-4">API-BIBLIA-AV</h1>
          <p className="lead">Centro cristiano Aliento de vida</p>
        </div>

        {props.LoginOut && (
          <button className="btn-select-logout" onClick={props.LoginOut}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
