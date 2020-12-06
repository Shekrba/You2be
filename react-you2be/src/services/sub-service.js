import axios from "axios";
import authHeader from './headers';

class SubService {

  checkIfAlreadySubscribed(channelId) {
    return axios.get(`sub/check/${channelId}`, { headers: authHeader() });
  }

  subscribe(channelId) {
    return axios.post(`sub/${channelId}`,null, { headers : authHeader()})
  }

  unsubscribe(channelId){
    return axios.delete(`sub/${channelId}`, { headers : authHeader()})
  }

  getSubscriptions(){
    return axios.get("sub", { headers : authHeader()});
  }
}

export default new SubService();