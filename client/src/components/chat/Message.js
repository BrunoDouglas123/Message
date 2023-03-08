import React from "react";
export class Message extends React.Component {
  render() {
    return (
      <div
        className="message-item"
        style={
          this.props?.userId === this.props.senderName
            ? styles.selfMessage
            : styles.otherMessage
        }
      >
        <div>{this.props.senderName}</div>
        <span style={{ fontSize: "24px" }}>
          <b>{this.props.text}</b>
        </span>
      </div>
    );
  }
}

const styles = {
  selfMessage: {
    color: "#0e62da",
    textAlign: "right",
    marginLeft: "auto",
  },
  otherMessage: {
    color: "black",
    textAlign: "left",
  },
};
