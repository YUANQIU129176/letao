<template>
  <div class="cotegory">
    <!-- 添加分类按钮 -->
    <div class="btns">
      <el-button
        type="primary"
        plain
        @click="addCategory"
      >添加分类</el-button>
    </div>
    <!-- 分裂列表 -->
    <template>
      <el-table
        :data="categoryList"
        height="500"
        border
        style="width: 100%"
      >
        <el-table-column type='selection'>
        </el-table-column>
        <el-table-column
          prop="id"
          label="分类编号"
          width=""
        >
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="分类名称"
        >
        </el-table-column>
      </el-table>
    </template>
    <!-- 分类弹框 -->
    <el-dialog
      title="添加分类"
      width='80%'
      :visible.sync="adddialogFormVisible"
    >
      <el-form :model="categoryForm">
        <el-form-item
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="categoryForm.categoryName"
            auto-complete="off"
            placeholder='请输入分类的名称'
          ></el-input>
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
  </div>
</template>
<script>
import { categoryRander, addCategoryData } from '@/api'
export default {
  data () {
    return {
      categoryList: [],
      page: 1,
      pageSize: 10,
      adddialogFormVisible: false,
      categoryForm: {
        categoryName: ''
      },
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 封装渲染
    init () {
      categoryRander(this.page, this.pageSize).then(res => {
        console.log(res)
        this.categoryList = res.rows
      })
    },
    addCategory () {
      // 显示弹框
      this.adddialogFormVisible = true
    },
    addSubmit () {
      // 添加方法
      addCategoryData({categoryName: this.categoryForm.categoryName}).then((res) => {
        console.log(res)
        // 关闭弹框
        this.adddialogFormVisible = false
        if (res.success === true) {
          // 信息提示
          this.$message.success('添加成功')
          // 重新渲染页面
          this.init()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.cotegory {
  .btns {
    padding-top: 30px;
  }
  .el-dialog{
    .el-dialog__body{
    padding: 0px;
  }
  }

}
</style>
