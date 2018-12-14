<template>
  <div class="index">
    <el-container>
      <el-aside
        width="auto"
        v-model="collapse"
      >
        <div class="avatar">
          <img
            src="@/assets/8.jpg"
            alt=""
          >
        </div>
        <!-- 下拉导航 -->
        <el-row>
          <el-menu
            :unique-opened=true
            default-active="2"
            class="el-menu-vertical-demo el-menu-admin"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse='collapse'
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>分类管理</span>
              </template>
              <el-menu-item index="1-1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>分类管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="1-2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>分类管理</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
            </el-submenu>
          </el-menu>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class="content">
            <a
              href="javascript:;"
              class='myicon myicon-menu toggle-btn'
              @click="collapse=!collapse"
            ></a>
            <div class="fonts">
              <i class="fa fa-arrow-right"></i>
              <a
                href="javascript:;"
                class="out"
              >退出</a>
            </div>
          </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.index {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .avatar {
    margin: 20px auto;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-size: cover;
    background-color: #fff;
    border: 3px solid #666;
    box-shadow: 0 1px 5px #ccc;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .toggle-btn {
    background-color: #666;
    // padding: 10px 15px;
    font-size: 25px;
    color: #fff;
    cursor: pointer;
    &:hover {
      background-color: #4292cf;
    }
  }
  .content {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .el-menu {
    border-right: solid 0px #e6e6e6;
  }
  .el-header {
    background-color: #666;
  }
}
</style>
