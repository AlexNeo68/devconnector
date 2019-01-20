import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogin } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps({ auth: { isAuthenticated }, errors }) {
    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (errors) {
      this.setState({ errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    this.props.userLogin(user);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  onChange={e => this.onChange(e)}
                />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  error={errors.password}
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

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  userLogin: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, errors }) => {
  return { auth, errors };
};

export default connect(
  mapStateToProps,
  { userLogin }
)(Login);
