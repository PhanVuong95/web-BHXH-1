import axios from "axios";
import { APP_CONFIG } from "../utils/constants";

const instance = axios.create({
  baseURL: APP_CONFIG.BASE_URL,
});
export default instance;
