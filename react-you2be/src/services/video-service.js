import axios from "axios";
import authHeader from "./headers";

class VideoService {

  getVideo(videoId) {
    return axios.get(`video/download/${videoId}`);
  }

  getAllVideos(){
    return axios.get("video");
  }

  getMyVideos() {
    return axios.get("video/my",{headers : authHeader()});
  }

   uploadVideo(file) {
    return axios.post("video/upload", file,{headers : authHeader()});
  }

  addVideo(video) {
    return axios.post("video", video,{headers : authHeader()});
  }

  editVideo(video) {
    return axios.put("video", video,{headers : authHeader()});
  }

  deleteVideo(videoId) {
    return axios.delete(`video/${videoId}`,{headers : authHeader()});
  }
}

export default new VideoService();