import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.18.138:3000/auth",
});
