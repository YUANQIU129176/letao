<template>
    <div class="goods">
        <!-- 添加分类按钮 -->
    <div class="btns">
      <el-button
        type="primary"
        plain
        @click="addGoods"
      >添加商品</el-button>
    </div>
    <!-- 分裂列表 -->
    <template>
      <el-table
        :data="goodsList"
        height="500"
        border
        style="width: 100%"
      >
        <el-table-column type='selection'>
        </el-table-column>
        <el-table-column
          prop="id"
          label="商品编号"
          width=""
        >
        </el-table-column>
        <el-table-column
            width='450'
          prop="proName"
          label="商品名称"
        >
        </el-table-column>
        <el-table-column
          prop="proDesc"
          label="商品描述"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="商品库存"
        >
        </el-table-column>
        <el-table-column
          prop="size"
          label="商品尺寸"
        >
        </el-table-column>
        <el-table-column
          label="是否下架"
        >
        <template slot-scope="scope">
            <span>{{scope.row.statu | goodsStatu}}</span>
        </template>
        </el-table-column>
        <el-table-column
          label="操作"
        >
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)" type='danger'>下架</el-button>
      </template>
        </el-table-column>
      </el-table>
    </template>
    </div>
</template>

<script>
import {goodsRander} from '@/api'
export default{
  data () {
    return {
      page: '',
      pageSize: '',
      goodsList: []
    }
  },
  methods: {
    handleEdit () {

    },
    addGoods () {

    }
  },
  mounted () {
    goodsRander(this.page, this.pageSize).then((res) => {
      console.log(res)
      this.goodsList = res.rows
    })
  },
  //   添加过滤器
  filters: {
    goodsStatu: (val) => {
      if (val === 1) {
        return '已上架'
      } else {
        return '已下架'
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
