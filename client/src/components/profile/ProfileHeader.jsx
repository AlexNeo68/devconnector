import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt={profile.user.name}
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status} at{" "}
                {!isEmpty(profile.company) ? (
                  <span> at {profile.company}</span>
                ) : null}
              </p>
              {!isEmpty(profile.location) ? <p>{profile.location}</p> : null}

              <p>
                {!isEmpty(profile.website) ? (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                ) : null}

                {!isEmpty(profile.social) &&
                !isEmpty(profile.social.twitter) ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-twitter fa-2x" />
                  </a>
                ) : null}

                {!isEmpty(profile.social) &&
                !isEmpty(profile.social.facebook) ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-facebook fa-2x" />
                  </a>
                ) : null}
                {!isEmpty(profile.social) &&
                !isEmpty(profile.social.linkedin) ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-linkedin fa-2x" />
                  </a>
                ) : null}
                {!isEmpty(profile.social) &&
                !isEmpty(profile.social.instagram) ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-instagram fa-2x" />
                  </a>
                ) : null}
                {!isEmpty(profile.social) &&
                !isEmpty(profile.social.youtube) ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-youtube fa-2x" />
                  </a>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
