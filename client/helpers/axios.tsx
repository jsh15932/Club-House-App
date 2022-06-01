import axios from "axios";
import Cookies from "js-cookie";
import { config } from "../config";

const Axios = axios;
const cookies = Cookies.get('token');

Axios.defaults.baseURL = config.url;

if(cookies) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${cookies}`;
}

export default Axios;