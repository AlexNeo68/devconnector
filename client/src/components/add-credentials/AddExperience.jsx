import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { profileAddExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  state = {
    title: "",
    company: "",
    location: "",
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
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      description: this.state.description,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current
    };
    this.props.profileAddExperience(expData, this.props.history);
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
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  name="title"
                  placeholder="* Job Title"
                  value={this.state.title}
                  error={errors.title}
                  onChange={e => this.onChange(e)}
                />

                <TextFieldGroup
                  name="company"
                  placeholder="* Company"
                  value={this.state.company}
                  error={errors.company}
                  onChange={e => this.onChange(e)}
                />

                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  error={errors.location}
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
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  name="description"
                  placeholder="Job Description"
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = ({ profile, errors }) => ({ profile, errors });

export default connect(
  mapStateToProps,
  { profileAddExperience }
)(withRouter(AddExperience));
