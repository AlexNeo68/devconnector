import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { profileAddEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  state = {
    school: "",
    fieldofstudy: "",
    degree: "",
    description: "",
    from: "",
    to: "",
    current: false,
    disabled: false,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps;
    if (errors) {
      this.setState({ errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      fieldofstudy: this.state.fieldofstudy,
      degree: this.state.degree,
      description: this.state.description,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    };
    this.props.profileAddEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  name="school"
                  placeholder="* School Or Bootcamp"
                  value={this.state.school}
                  error={errors.school}
                  onChange={e => this.onChange(e)}
                />

                <TextFieldGroup
                  name="degree"
                  placeholder="* Degree Or Certificate"
                  value={this.state.degree}
                  error={errors.degree}
                  onChange={e => this.onChange(e)}
                />

                <TextFieldGroup
                  name="fieldofstudy"
                  placeholder="Field Of Study"
                  value={this.state.fieldofstudy}
                  error={errors.fieldofstudy}
                  onChange={e => this.onChange(e)}
                />

                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  value={this.state.from}
                  error={errors.from}
                  type="date"
                  onChange={e => this.onChange(e)}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  value={this.state.from}
                  error={errors.from}
                  type="date"
                  disabled={this.state.disabled ? true : false}
                  onChange={e => this.onChange(e)}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.from}
                    id="current"
                    onChange={e => this.onCheck(e)}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current School
                  </label>
                </div>

                <TextAreaFieldGroup
                  name="description"
                  placeholder="Program Description"
                  value={this.state.description}
                  error={errors.description}
                  onChange={e => this.onChange(e)}
                  info="Some of your responsabilities, etc"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

export default connect(
  mapStateToProps,
  { profileAddEducation }
)(withRouter(AddEducation));
