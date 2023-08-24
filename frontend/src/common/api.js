import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class DeckBuilderApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${DeckBuilderApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  static async login(user) {
    let res = await this.request(
      `auth/token`,
      {
        "username": user.username,
        "password": user.password,
      },
      "post"
    );
    return res.token;
  }


  static async signup(user) {
    let res = await this.request(
      `auth/register`,
      user,
      "post"
    );
    return res.token;
  }


  static async getRankings() {
    let res = await this.request(
      `matches/rankings`,
    );
    return res.users;
  }


  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }


  static async editUser(username, user) {
    let res = await this.request(
      `users/${username}`,
      user,
      "patch"
    );
  }
}

export default DeckBuilderApi;