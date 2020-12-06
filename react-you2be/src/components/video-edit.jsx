import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import VideoService from "../services/video-service";
import { toast } from "react-toastify";

export default function VideoEdit(props) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    VideoService.getVideo(props.match.params.id)
      .then((res) => {
        setValue("title", res.data.title);
        setValue("description", res.data.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const editVideo = (data) => {
    const body = {
      title: data.title,
      description: data.description,
      id: props.match.params.id,
    };

    VideoService.editVideo(body)
      .then((res) => {
        toast("Video edited.");
        props.history.push(`/video/${props.match.params.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row mt-5 text-light">
      <div className="col"></div>
      <div className="col">
        <h2 className="mb-5">Edit video</h2>
        <form onSubmit={handleSubmit(editVideo)}>
          <div className="form-group">
            <label htmlFor="titleInput">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="titleInput"
              ref={register({ required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descriptionInput">Description</label>
            <input
              name="description"
              type="text"
              className="form-control"
              id="descriptionInput"
              ref={register({ required: true })}
            />
          </div>
          <button name="submit" type="submit" className="btn react-cyan-bg">
            Submit
          </button>
        </form>
      </div>
      <div className="col"></div>
    </div>
  );
}
