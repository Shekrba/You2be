import axios from "axios";

class SearchService {

  searchVideosAndChannels(query){
    return axios.get(`search/${query}`);
  }

}

export default new SearchService();