import axios from "axios";

class AuthService {

  login(username, password) {
    return axios
      .post("auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.data && response.data.token) {
          localStorage.setItem("currentUser", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("currentUser");
  }

  register(user) {
    return axios.post("auth/register", user);
  }

  upload(file){
    return axios.post("user/image/upload", file);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));;
  }
}

export default new AuthService();