<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addVisible = true"
          >添加分类</el-button
        >
      </div>
      <!-- 数据表格 -->
      <el-table style="width: 100%" :data="cateList" border stripe>
        <el-table-column
          label="序号"
          type="index"
          width="100"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加分类的对话框
    el-dialog 对话框组件  
    title:左上角标题
    visible: 控制对话框是否显示（true显示  false隐藏）
    visible.sync 组件内检测到对话框关闭，内部设定的关闭（右上角x的关闭）
    .sync 是vue2.3版本新增 类似v-model 给子组件实现“双向数据绑定”
    v-model本质 :value="vue变量"  @input="val => vue变量= val"
    vue2中一个标签只能用1次v=model  vue3中可以用多次

    before-close  对话框关闭前的回调  可以在内部用done（）关闭对话框  
    什么都不调用就会阻止对话框关闭，本应用中没有用到，去掉了
    
     -->
    <el-dialog title="添加文章分类" :visible.sync="addVisible" width="35%" @closed="onAddClosedFn">
      <!-- 添加的表单 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="addForm.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="addForm.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelFn">取 消</el-button>
        <el-button size="mini" type="primary" @click="addFn">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getArtCateListAPI } from "@/api"
import { addArtCateAPI } from "@/api"

export default {
  name: "ArtCate",
  data() {
    return {
      // 文章的分类列表
      cateList: [],
      addVisible: false, // 添加分类-对话框是否显示
      addForm: { // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
    addRules: { // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
    }
    }
  },
  created() {
    // 获取文章分类
    this.initCateListFn();
  },
  methods: {
    // 获取文章分类
    async initCateListFn() {
      const res = await getArtCateListAPI();
      this.cateList = res.data.data;
    },
    // 对话框内-添加按钮-点击事件
    addFn() {
      this.addVisible = false;
    },
    // 对话框内-取消按钮-点击事件
    cancelFn() {
      this.addVisible = false;
    },
    onAddClosedFn() {
    this.$refs.addRef.resetFields()
    },
    async addFn () {
    // 表单预校验
    this.$refs.addRef.validate(async valid => {
        if (valid) {
            // 调用接口传递数据给后台
            const { data: res } = await addArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error('添加分类失败！')
            this.$message.success('添加分类成功！')
            // 重新请求列表数据
            this.initCateListFn()
            // 关闭对话框
            this.addVisible = false
        } else {
            return false
        }
    })
  }
  },
};
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>