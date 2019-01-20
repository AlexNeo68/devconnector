import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deletePost, likePost, unLikePost } from "../../actions/postActions";

class PostItem extends Component {
  onClickDeletePost(e) {
    const { deletePost, post } = this.props;
    deletePost(post._id);
  }
  onClickLike(e) {
    const { likePost, post } = this.props;
    likePost(post._id);
  }
  onClickUnLike(e) {
    const { unLikePost, post } = this.props;
    unLikePost(post._id);
  }
  findUserLike() {
    const { post, auth } = this.props;

    return post.likes.filter(like => like.user === auth.user.id).length > 0;
  }
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={post.name}
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={e => this.onClickLike(e)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike()
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>

                <button
                  onClick={e => this.onClickUnLike(e)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>

                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={e => this.onClickDeletePost(e)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
PostItem.defaultProps = {
  showActions: true
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unLikePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  { deletePost, likePost, unLikePost }
)(PostItem);
