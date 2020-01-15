import React, { Component } from "react";

const Panel = props => {
  const { title, content } = props;
  return(
  <div className="panel">
      <div className="panel-bar">
        <h3>{title}</h3>
        <div className="panel-buttons">
          <button className="panel-btn-add-task">Add task</button>
          <button className="panel-btn-view hide-btn">View</button>
        </div>
      </div>
      <div className="panel-content">{content}</div>
    </div>
  );
}

export default function PanelMaker() {
    return (
      <div>
        <Panel />
      </div>
    );
}