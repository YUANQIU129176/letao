// 1 引入路由插件
import axios from 'axios'

// 2 引入基础路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 3 打开cookie
axios.defaults.withCredentials = true

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

// 5 判断是否登录
export const userSubmit = () => {
  return axios.get('/employee/checkRootLogin').then((result) => {
    return result.data
  })
}

// 6 一级产品管理数据查询
export const categoryRander = (page, pageSize) => {
  return axios.get('/category/queryTopCategoryPaging', {params: {page: page, pageSize: pageSize}}).then((result) => {
    return result.data
  })
}

// 7 添加分类数据
export const addCategoryData = (pa) => {
  return axios.post('/category/addTopCategory', pa).then((result) => {
    return result.data
  })
}

// 更新分类数据
export const updateCategory = (pa) => {
  return axios.post('/category/addTopCategory', pa).then((result) => {
    return result.data
  })
}
