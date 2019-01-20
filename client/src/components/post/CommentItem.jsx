import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onClickDeleteComment(e) {
    const { postID, deleteComment, comment } = this.props;
    deleteComment(postID, comment._id);
  }
  render() {
    const { comment, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt={comment.name}
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {auth.user.id === comment.user ? (
              <span>
                <button
                  onClick={e => this.onClickDeleteComment(e)}
                  className="btn btn-danger"
                >
                  <i className="fas fa-times" />
                </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postID: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
