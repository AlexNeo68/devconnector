import React from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import PropTypes from "prop-types";

const ProfileCard = ({ profile }) => {
  const { name, company, avatar, status, location, handle, skills } = profile;
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img className="rounded-circle" src={avatar} alt={name} />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{name}</h3>
          <p>
            {status} {!isEmpty(company) ? <span>at {company}</span> : null}
          </p>
          {!isEmpty(location) ? <p>{location}</p> : null}

          <Link to={`/profile/${handle}`} className="btn btn-info">
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-lg-block">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="list-group-item">
                <i className="fa fa-check pr-1" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileCard;
