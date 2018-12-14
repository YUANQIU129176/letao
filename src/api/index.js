// 1 引入路由插件
import axios from 'axios'

// 2 引入基础路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 3 创建登录的接口
export const loginSubmit = (pa) => {
  return axios.post('/employee/employeeLogin', pa).then((result) => {
    return result.data
  })
}

// 4 创建用户管理接口
export const userRander = (page, pageSize) => {
  return axios.get('/user/queryUser', {params: {page: page, pageSize: pageSize}}).then((result) => {
    return result.data
  })
}
