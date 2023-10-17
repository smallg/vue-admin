import axios from 'axios'
import { ElMessage } from 'element-plus'
// import useUserStore from '@/store/modules/user'
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    // const userStore = useUserStore()

    // if (userStore.token) {
    //   config.headers.token = userStore.token
    // }

    config.headers.token = 'test-token';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
)

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = '未登录'
        break
      case 403:
        message = '登录过期，请重新登录'
        break
      case 404:
        message = '网络请求不存在'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = error.response.data.message
        break
    }
    ElMessage({
      type: 'error',
      message,
      duration: 100000000
    })
    return Promise.reject(error)
  },
)

export default request