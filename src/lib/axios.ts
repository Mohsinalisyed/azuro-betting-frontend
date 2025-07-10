// lib/axios.ts
import axios from 'axios'


export const axiosInstance = axios.create({
  baseURL: '/api',
})

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Always set Content-Type to application/json
    config.headers['Content-Type'] = 'application/json'

    // Optionally attach token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }


    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {

    return response
  },
  (error) => {
    console.error('[Axios Response Error]', error)

    if (error.response?.status === 401) {
      console.warn('Unauthorized – maybe redirect to login?')
    }

    return Promise.reject(error)
  }
)

