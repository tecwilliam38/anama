import axios from "axios";

const VERCELAPI = "https://apianama.vercel.app";

const LOCALURL = "http://192.168.0.37:3000/";

const api = axios.create({
    baseURL: VERCELAPI,
});

export default api;