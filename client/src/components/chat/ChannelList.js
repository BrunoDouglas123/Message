import React from "react";
import { Channel } from "./Channel";
import "./Style.css";

export class ChannelList extends React.Component {
  handleClick = (id) => {
    this.props.onSelectChannel(id);
  };

  render() {
    let list = `There is no channels to show`;

    if (this.props.channels) {
      list = this.props.channels.map((c) => (
        <Channel
          key={c.id}
          id={c.id}
          name={c.name}
          participants={c.participants}
          onClick={this.handleClick}
        />
      ));
    }
    return (
      <div className="channel-list">
        <div className="user-list">
          <div className="title">
            <h3 className="usuarios">Usuarios</h3>
          </div>
          <input className="users" type="text" placeholder="Buscar..." />
          {list}
        </div>
      </div>
    );
  }
}
