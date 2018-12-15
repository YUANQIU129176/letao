<template>
  <div class="user">
    <!-- 表格 -->
    <template>
      <el-table
        :data="userDataList"
        height="500"
        border
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.isDelete | capitalize}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
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
  </div>
</template>
<script>
import { userRander } from '@/api'
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      userDataList: [],
      // 分页的总条数
      total: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 渲染页面的函数
    init () {
      userRander(this.page, this.pageSize).then(res => {
        console.log(res)
        this.userDataList = res.rows
        this.total = res.total
      })
    },
    handleDelete () {},
    handleDelete1 (row) {
      console.log(row)
    },
    // 分页功能
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
    }
  },
  // 使用过滤器
  filters: {
    capitalize: function (value) {
      if (value === 1) {
        return '已启用'
      } else {
        return '禁用'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
