import axios from "axios";

class UserService {

  getProfile(userId){
    return axios.get(`user/${userId}`);
  }

}

export default new UserService();