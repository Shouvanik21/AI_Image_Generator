import axios from "axios";

const imageApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  withCredentials: true,
});

export default imageApi;
