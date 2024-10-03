import { getToken } from "@utils/auth"
import { ErrorHandler } from "@utils/errorHandler"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`
      config.headers["X-API-Key"] = token
    }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    ErrorHandler.handle(error)
    return Promise.reject(error)
  }
)

export default axiosInstance
