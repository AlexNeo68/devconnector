import React, { Component } from "react";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import Spinner from "../common/Spinner";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postsContent;
    if (posts === null || loading) {
      postsContent = <Spinner />;
    } else {
      postsContent = (
        <div className="posts">
          <PostFeed posts={posts} />
        </div>
      );
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="post-form mb-3">
                <div className="card card-info">
                  <div className="card-header bg-info text-white">
                    Say Something...
                  </div>
                  <div className="card-body">
                    <PostForm />
                  </div>
                </div>
              </div>
              {postsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propType = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ post }) => ({ post });

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
