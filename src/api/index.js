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

// 8 更新分类数据
export const updateCategory = (pa) => {
  return axios.post('/category/updateTopCategory', pa).then((result) => {
    return result.data
  })
}

// 9 分类二 查询渲染
export const categoryRanderTwo = (page, pageSize) => {
  return axios.get('/category/querySecondCategoryPaging', {params: {page: page, pageSize: pageSize}}).then((result) => {
    return result.data
  })
}

// 10 商品页面渲染
export const goodsRander = (page, pageSize) => {
  return axios.get('/product/queryProductDetailList', {params: {page: page, pageSize: pageSize}}).then((result) => {
    return result.data
  })
}

// 上传添加品牌的按钮
export const addsecondCategory = (pa) => {
  return axios.post('/category/addSecondCategory', pa).then((result) => {
    return result.data
  })
}

// 商品管理添加
export const addGoodsData = (pa) => {
  return axios.post('/product/addProduct', pa).then((result) => {
    return result.data
  })
}

// 商品修改
export const updateGoodsData = (pa) => {
  return axios.post('/product/updateProduct', pa).then((result) => {
    return result.data
  })
}
