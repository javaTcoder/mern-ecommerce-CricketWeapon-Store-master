import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createComment,
  deleteComment,
  getComments,
  likeComment,
} from "../../../actions/commentActions";
import "./CommentSection.css";

const CommentSection = (props) => {
  const dispatch = useDispatch();
  const { productId } = props;
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    dispatch(getComments(productId));
  }, [dispatch, productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.info("Please login first");
      return;
    }
    dispatch(createComment({ content, productId, userId: user._id }));
    setContent("");
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const handleLike = (commentId) => {
    if (!user) {
      toast.info("Please login first");
      return;
    }
    dispatch(likeComment(commentId));
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Submit</button>
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.content}</p>
            <div className="comment-actions">
              <button onClick={() => handleLike(comment._id)}>Like</button>
              {user && user._id === comment.userId && (
                <button onClick={() => handleDelete(comment._id)}>Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;