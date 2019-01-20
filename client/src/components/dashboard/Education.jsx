import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { educationDelete } from "../../actions/profileActions";

class Education extends Component {
  onClick(e, id) {
    this.props.educationDelete(id);
  }
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment parse="YYYY-MM-DD HH:mm">{edu.from}</Moment> -{" "}
          {edu.to ? <Moment parse="YYYY-MM-DD HH:mm">{edu.to}</Moment> : "now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={e => this.onClick(e, edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  educationDelete: PropTypes.func.isRequired
};

export default connect(
  null,
  { educationDelete }
)(Education);
