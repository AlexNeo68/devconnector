import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    const { getPost, match } = this.props;
    getPost(match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (Object.keys(post).length === 0 || post === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div className="col-md-12">
          <PostItem showActions={false} post={post} />
          <CommentForm postID={post._id} />
          <CommentFeed postID={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="mb-3">
            <Link to="/feed" className="btn btn-default">
              Back
            </Link>
          </div>
          <div className="row">{postContent}</div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ post }) => ({ post });

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
