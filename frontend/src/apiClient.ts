import axios from "axios"

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "/",
  headers: {
    "Content-type": "application/json",
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem("userInfo")) {
      config.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("userInfo")!).token
      }`
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

export default apiClient
