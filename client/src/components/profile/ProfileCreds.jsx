import React, { Component } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const experiences = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment parse="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to ? <Moment parse="YYYY/MM/DD"> {exp.from}</Moment> : " now"}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          <strong>Description:</strong> {exp.description}
        </p>
      </li>
    ));

    const educations = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment parse="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to ? <Moment parse="YYYY/MM/DD"> {edu.from}</Moment> : " now"}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          {!isEmpty(edu.description) ? (
            <span>
              <strong>Description:</strong> {edu.description}
            </span>
          ) : null}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {experiences.length > 0 ? (
            <ul className="list-group">{experiences}</ul>
          ) : (
            <p>not experience</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {educations.length > 0 ? (
            <ul className="list-group">{educations}</ul>
          ) : (
            <p>not educations</p>
          )}
        </div>
      </div>
    );
  }
}

ProfileCreds.propType = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

export default ProfileCreds;
