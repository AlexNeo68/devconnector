import React from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

function CommentFeed({ comments, postID }) {
  return (
    <div className="comments">
      {comments.map(comment => (
        <CommentItem key={comment._id} postID={postID} comment={comment} />
      ))}
    </div>
  );
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postID: PropTypes.string.isRequired
};

export default CommentFeed;
