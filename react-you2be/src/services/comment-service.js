import axios from "axios";
import authHeader from './headers';

class CommentService {

  addComment(comment) {
    return axios.post("comment", comment, { headers: authHeader() });
  }

  getTopLevelComments(videoId){
      return axios.get(`comment/${videoId}`)
  }

  getReplies(parentId){
    return axios.get(`comment/reply/${parentId}`);
  }

  deleteComment(commentId){
    return axios.delete(`comment/${commentId}`, { headers: authHeader() });
  }

}

export default new CommentService();