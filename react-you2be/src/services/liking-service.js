import axios from "axios";
import authHeader from './headers';

class LikingService {

  checkLikings(videoId) {
    return axios.get(`liking/check/${videoId}`, { headers: authHeader() });
  }

  makeLiking(body) {
    return axios.post(`liking`, body, { headers: authHeader() });
  }

  deleteLiking(videoId) {
    return axios.delete(`liking/${videoId}`, { headers: authHeader() });
  }

}

export default new LikingService();