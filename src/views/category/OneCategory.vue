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
        <el-table-column
          label="操作"
        >
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)" type='primary'>编辑</el-button>
      </template>
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
    <!-- 编辑弹框 -->
    <el-dialog
      title="添加分类"
      width='80%'
      :visible.sync="editdialogFormVisible"
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
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click='editSubmit'
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <!-- 分页 -->
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
    <!-- 分页 -->
  </div>
</template>
<script>
import { categoryRander, addCategoryData, updateCategory } from '@/api'
export default {
  data () {
    return {
      categoryList: [],
      page: 1,
      pageSize: 10,
      adddialogFormVisible: false,
      categoryForm: {
        id: '',
        categoryName: ''
      },
      formLabelWidth: '120px',
      editdialogFormVisible: false,
      // 提交数据
      dataSubmit: {
        categoryName: '',
        id: '',
        isDelete: ''
      },
      // 分页
      total: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 1 封装渲染
    init () {
      categoryRander(this.page, this.pageSize).then(res => {
        console.log(res)
        this.categoryList = res.rows
        this.total = res.total
      })
    },
    addCategory () {
      // 2 显示弹框
      this.adddialogFormVisible = true
    },
    addSubmit () {
      // 3 添加方法
      addCategoryData({categoryName: this.categoryForm.categoryName}).then((res) => {
        // console.log(res)
        // 4 关闭弹框
        this.adddialogFormVisible = false
        if (res.success === true) {
          // 信息提示
          this.$message.success('添加成功')
          // 5 重新渲染页面
          this.init()
        } else {
          this.$message.error('添加失败 请重新添加')
        }
      })
    },
    // 编辑功能的实现
    handleEdit (row) {
      console.log(row)
      // 1 实现弹框
      this.editdialogFormVisible = true
      this.categoryForm.categoryName = row.categoryName
      // 2获取提交需要的数据
      this.dataSubmit.categoryName = row.categoryName
      this.dataSubmit.id = row.id
      this.dataSubmit.isDelete = row.isDelete
    },
    // 2 编辑提交
    editSubmit () {
      updateCategory(this.dataSubmit).then((res) => {
        if (res.success === true) {
          console.log(res)
          this.editdialogFormVisible = false
          this.init()
          this.$message.success('修改成功')
        } else {
          this.$message.success('失败了喔')
        }
      })
    },
    // 分页功能
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.init()
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
