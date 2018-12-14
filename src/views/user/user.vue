<template>
    <div class="user">
        我是用户
    </div>
</template>
<script>
import {userRander} from '@/api'
export default{
  data () {
    return {
      page: 1,
      pageSize: 10
    }
  },
  mounted () {
    userRander(this.page, this.pageSize).then((res) => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
