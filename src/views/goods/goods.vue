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
          width=''
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
        <el-table-column label="是否下架">
          <template slot-scope="scope">
            <span>{{scope.row.statu | goodsStatu}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width='200'
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleupdate(scope.row)"
              type='danger'
            >下架</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              type='primary'
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 添加商品弹框 -->、
    <el-dialog
      title="添加商品"
      :visible.sync="adddialogFormVisible"
    >
      <el-form :model="goodsForm">

        <el-form-item :label-width="formLabelWidth">
          <!-- 下拉框 -->
          <template>
            <el-select
              v-model="goodsForm.brandId"
              placeholder="请选择"
              :clearable='true'
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.brandName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
          <el-input
            placeholder='请输入产品名称'
            v-model="goodsForm.proName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品描述'
            v-model="goodsForm.proDesc"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品数量'
            v-model="goodsForm.num"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品尺码'
            v-model="goodsForm.size"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品原价'
            v-model="goodsForm.oldPrice"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品折扣价'
            v-model="goodsForm.price"
            auto-complete="off"
          ></el-input>
          <!-- 图片的上传 -->
          <el-upload
            action="http://127.0.0.1:3000/product/addProductPic"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit='3'
            :with-credentials="true"
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
          @click="addGoodsSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!--分页 -->
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
    <!-- 修改商品弹框 -->
   <el-dialog
      title="添加商品"
      :visible.sync="updatedialogFormVisible"
    >
      <el-form :model="goodsForm">

        <el-form-item :label-width="formLabelWidth">
          <!-- 下拉框 -->
          <template>
            <el-select
              v-model="goodsForm.brandId"
              placeholder="请选择"
              :clearable='true'
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.brandName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
          <el-input
            placeholder='请输入产品名称'
            v-model="goodsForm.proName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品描述'
            v-model="goodsForm.proDesc"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品数量'
            v-model="goodsForm.num"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品尺码'
            v-model="goodsForm.size"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品原价'
            v-model="goodsForm.oldPrice"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-input
            placeholder='请输入产品折扣价'
            v-model="goodsForm.price"
            auto-complete="off"
          ></el-input>
          <!-- 图片的上传 -->
          <el-upload
            action="http://127.0.0.1:3000/product/addProductPic"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :limit='3'
            :with-credentials="true"
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
        <el-button @click="updatedialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateGoodsSubmit"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { goodsRander, categoryRanderTwo, addGoodsData, updateGoodsData } from '@/api'
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      goodsList: [],
      // 添加商品弹框
      adddialogFormVisible: false,
      formLabelWidth: '120px',
      total: 0,
      goodsForm: {
        proName: '',
        oldPrice: '',
        price: '',
        proDesc: '',
        size: '',
        statu: '',
        num: '',
        brandId: '',
        pic: []
      },
      options: [],
      objImgData: {
        picName: '',
        picAddr: ''
      },
      updatedialogFormVisible: false
    }
  },
  methods: {
    // 修改商品
    updateGoodsSubmit () {
      updateGoodsData(this.goodsForm).then((res) => {
        console.log(res)
        this.updatedialogFormVisible = false
        this.init()
      })
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
    },
    // 修改分类
    updateData () {
      console.log(1111)
    },
    // 渲染
    init () {
      goodsRander(this.page, this.pageSize).then(res => {
        console.log(res)
        this.goodsList = res.rows
        this.total = res.total
      })
    },
    // 编辑
    handleEdit (row) {
      // console.log(row)
      row.pic = this.goodsForm.pic
      this.updatedialogFormVisible = true
      categoryRanderTwo(this.page, this.pageSize).then(res => {
        console.log(res)
        console.log(row)
        this.goodsForm = row
        this.options = res.rows
        // this.goodsForm.oldPrice = row.oldPrice
        // this.goodsForm.proName = row.proName
        // this.goodsForm.price = row.price
        // this.goodsForm.proDesc = row.proDesc
        // this.goodsForm.size = row.size
        // this.goodsForm.statu = row.statu
        // this.goodsForm.brandId = row.brandId
        // // this.goodsForm.pic = row.pic
        // this.goodsForm.num = row.num
      })
    },
    addGoods () {
      // 1 弹框
      this.adddialogFormVisible = true
      // 2 渲染
      this.options = ''
      categoryRanderTwo(this.page, this.pageSize).then(res => {
        console.log(res)
        this.options = res.rows
      })
    },
    // 图片预览
    handlePictureCardPreview (file) {
      console.log(file)
    },
    // 图片的删除
    handleRemove () {},
    // 图片上传成功
    imgSuccess (response, file, fileList) {
      console.log(file)
      // 文件路径
      this.objImgData.picAddr = file.response.picAddr
      this.objImgData.picName = file.name
      this.goodsForm.pic.push(...this.objImgData)
    },
    // 提交
    addGoodsSubmit () {
      addGoodsData(this.goodsForm).then(res => {
        console.log(res)
        this.adddialogFormVisible = false
        // 刷新
        this.init()
      })
    }
  },
  mounted () {
    this.init()
  },
  //   添加过滤器
  filters: {
    goodsStatu: val => {
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
