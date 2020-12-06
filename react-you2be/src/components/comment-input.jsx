import React from "react";
import { useForm } from "react-hook-form";
import CommentService from "../services/comment-service";

export default function CommentInput(props) {
  const addComment = (data) => {
    var newComment = {
      text: data.comment,
      videoId: props.videoId,
      parentId: props.parentId,
    };

    CommentService.addComment(newComment)
      .then((res) => {
        props.onCommentAdd(res.data);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const user = props.user;
  const { register, handleSubmit, reset } = useForm();

  return (
    <form onSubmit={handleSubmit(addComment)}>
      <div className="row">
        <div className="col-0 ml-3 text-center">
          <label>
            <img src={user.imageSrc} className="circleMedium" alt="User" />
          </label>
        </div>
        <div className="col-10">
          <textarea
            type="text"
            className="form-control bg-dark text-light"
            id="commentInput"
            placeholder="Add a public comment..."
            ref={register({ required: true })}
            name="comment"
          ></textarea>
        </div>
        <div className="col-1">
          <button type="submit" className="btn react-cyan-bg">
            Comment
          </button>
        </div>
      </div>
    </form>
  );
}
