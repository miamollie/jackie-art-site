import React from "react";

import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import vimeo from "../img/social/vimeo.svg";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black">
        <div className="columns">
          <div className="column is-9 is-inline">
            <a
              className="navbar-item has-text-white-ter"
              href="/admin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Admin
            </a>
          </div>
          <div className="column is-4 social">
            <a
              title="facebook"
              href="https://www.facebook.com/dorothy.smith.33449138"
            >
              <img
                src={facebook}
                alt="Facebook"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="twitter" href="https://twitter.com/PlaytimeJB">
              <img
                className="fas fa-lg"
                src={twitter}
                alt="Twitter"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
            <a title="vimeo" href="https://vimeo.com/418064877">
              <img
                src={vimeo}
                alt="Vimeo"
                style={{ width: "1em", height: "1em" }}
              />
            </a>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
