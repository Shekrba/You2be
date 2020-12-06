import React from "react";
import { useForm } from "react-hook-form";
import VideoService from "../services/video-service";
import { toast } from "react-toastify";

export default function VideoUpload(props) {
  const { register, handleSubmit } = useForm();

  const uploadVideo = (data) => {
    const body = {
      title: data.title,
      description: data.description,
      src: "",
    };

    console.log(props);

    const fileList = data.file;

    let formData = new FormData();

    if (fileList.length > 0) {
      let file = fileList[0];
      formData.append("file", file, file.name);
      VideoService.uploadVideo(formData)
        .then((res) => {
          body.src = res.data.src;
          addVideo(body);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addVideo = (video) => {
    VideoService.addVideo(video)
      .then((res) => {
        toast("Video successfully uploaded.");
        props.history.push("/my-videos");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="row mt-5 text-light">
      <div className="col"></div>
      <div className="col">
        <h2>Upload video</h2>
        <form onSubmit={handleSubmit(uploadVideo)}>
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
              ref={register}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fileInput">File</label>
            <input
              name="file"
              type="file"
              className="form-control-file"
              id="fileInput"
              ref={register({ required: true })}
            />
          </div>
          <button name="submit" type="submit" className="btn react-cyan-bg">
            Upload
          </button>
        </form>
      </div>
      <div className="col"></div>
    </div>
  );
}
