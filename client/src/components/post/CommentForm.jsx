import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComment } from "../../actions/postActions";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CommentForm extends Component {
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
    const { auth, postID } = this.props;
    const newComment = {
      text: this.state.text,
      name: auth.user.name,
      avatar: auth.user.avatar
    };

    this.props.addComment(postID, newComment);
    this.setState({ text: "" });
  }

  render() {
    const { text, errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, errors }) => ({ auth, errors });

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postID: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
