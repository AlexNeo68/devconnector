import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userRegister } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, name, password, password2 } = this.state;
    const newUser = { email, name, password, password2 };
    this.props.userRegister(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  error={errors.name}
                  type="text"
                  onChange={e => this.onChange(e)}
                />
                <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  onChange={e => this.onChange(e)}
                  info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  error={errors.password}
                  type="password"
                  onChange={e => this.onChange(e)}
                />
                <TextFieldGroup
                  name="password2"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  error={errors.password2}
                  type="password"
                  onChange={e => this.onChange(e)}
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

const mapStateToProps = ({ auth, errors }) => {
  return {
    auth,
    errors
  };
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  userRegister: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { userRegister }
)(withRouter(Register));
