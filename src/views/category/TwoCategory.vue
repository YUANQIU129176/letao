
<template>
  <div class="two">
    <!-- 添加分类按钮 -->
    <div class="btns">
      <el-button
        type="primary"
        plain
        @click='addcategory'
      >添加品牌</el-button>
    </div>
    <!-- 分裂列表 -->
    <template>
      <el-table
        :data="dataList"
        height="500"
        border
        style="width: 100%"
      >
        <el-table-column type='selection'>
        </el-table-column>
        <el-table-column
          prop="id"
          label="品牌编号"
          width=""
        >
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌名称"
        >
        </el-table-column>
        <el-table-column label="品牌Logo">
          <template slot-scope="scope">
            <span>
              <img
              :src="'http://127.0.0.1:3000'+ scope.row.brandLogo"
              alt=""
              style="width: 100px;height: 100px"
            >
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="所属分类"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              type='primary'
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 添加品牌弹框 -->
    <el-dialog
      title="添加品牌"
      width='60%'
      :visible.sync="adddialogFormVisible"
    >
      <el-form :model="categoryForm">
        <el-form-item :label-width="formLabelWidth">
          <!-- 下拉框 -->
          <template>
            <el-select
              v-model="id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.categoryName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
          <!-- 下拉框 -->
          <el-input
            v-model="categoryForm.brandName"
            auto-complete="off"
            placeholder='请输入品牌的名称'
          ></el-input>
          <!-- 图片上传 -->
          <el-upload
            action="http://127.0.0.1:3000/category/addSecondCategoryPic"
            list-type="picture-card"
            :with-credentials="true"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            name="pic1"
            :on-success='imgSuccess'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click='addSubmit'
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog
      title="图片预览"
      width='80%'
      :visible.sync="imgdialogTableVisible"
    >
     <img :src="imgPath" alt="">
    </el-dialog>
    <!-- 分页功能 -->
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>
<script>
import { categoryRanderTwo, categoryRander, addsecondCategory } from '@/api'
export default {
  data () {
    return {
      // 页面渲染数组
      dataList: [],
      page: 1,
      pageSize: 5,
      // 弹框
      adddialogFormVisible: false,
      categoryForm: {
        brandName: ''
      },
      formLabelWidth: '120px',
      id: '',
      options: [],
      imgPath: '',
      imgdialogTableVisible: false,
      brandLogo: '',
      hot: 1,
      total: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      categoryRanderTwo(this.page, this.pageSize).then(res => {
        console.log(res)
        // 赋值
        this.dataList = res.rows
        this.total = res.total
      })
    },
    // 分页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 当前页为page
      this.page = val
      this.init()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    // 编辑
    handleEdit () {},

    // 弹框 提交按钮
    addSubmit () {
      addsecondCategory({brandName: this.categoryForm.brandName, brandLogo: this.brandLogo, categoryId: this.id, hot: this.hot}).then(res => {
        console.log(this.brandLogo)
        this.imgdialogTableVisible = false
      })
    },
    // 1添加分类按钮
    addcategory () {
      this.adddialogFormVisible = true
      // 2发送请求
      categoryRander(this.page, this.pageSize).then(res => {
        console.log(res)
        // 3把数据添加到下拉选框中
        this.options = res.rows
      })
    },
    // 图片的上传
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      console.log(file)
      this.imgdialogTableVisible = true
      this.imgPath = 'http://127.0.0.1:3000' + file.response.picAddr
    },
    // 图片上传成功
    imgSuccess (response, file, fileList) {
      console.log(response)
      // 文件路径
      this.brandLogo = file.response.picAddr
    }

  }
}
</script>
<style lang="scss" scoped>
</style>
