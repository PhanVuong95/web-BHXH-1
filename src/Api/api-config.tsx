import axios from "axios";

const instance = axios.create({
  baseURL: "https://portal-bhxh.dnpgroup.com.vn/",
});
export default instance;
