import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { experienceDelete } from "../../actions/profileActions";

class Experience extends Component {
  onClick(e, id) {
    this.props.experienceDelete(id);
  }
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment parse="YYYY-MM-DD HH:mm">{exp.from}</Moment> -{" "}
          {exp.to ? <Moment parse="YYYY-MM-DD HH:mm">{exp.to}</Moment> : "now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={e => this.onClick(e, exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  experienceDelete: PropTypes.func.isRequired
};

export default connect(
  null,
  { experienceDelete }
)(Experience);
