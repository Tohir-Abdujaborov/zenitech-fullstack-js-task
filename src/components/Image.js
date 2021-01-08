import React from "react";

export default function (props) {
  function getImageUrl(id, secret, server) {
    return (
      "https://live.staticflickr.com/" +
      server +
      "/" +
      id +
      "_" +
      secret +
      "_q.jpg"
    );
  }
  return (
    <div className="container image-component">
      <div className="row align-items-end">
        <div className="col-sm-2">
          <img
            src={getImageUrl(props.id, props.secret, props.server)}
            alt="Flickr recent pictures"
          />
        </div>
        <div className="col-sm-3">{props.title}</div>
      </div>
    </div>
  );
}
