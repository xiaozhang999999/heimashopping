<template>
  <div>
  <el-button type="success">成功按钮</el-button>
 </div>
</template>

<script>
// 命名导出，必须要大括号括起
import { getListAPI } from '@/api'
export default {
  created () {
    this.getListFn()
  },
  methods: {
    async getListFn () {
      const res = await getListAPI()
      console.log(res)
    }
  }
}
</script>

<style scoped></style>
