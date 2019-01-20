import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../actions/postActions";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class PostForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  componentWillReceiveProps({ errors }) {
    if (errors) this.setState({ errors });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
  }

  render() {
    const { text, errors } = this.state;
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <div className="form-group">
          <TextAreaFieldGroup
            name="text"
            placeholder="Create a post"
            value={text}
            error={errors.text}
            onChange={e => this.onChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
