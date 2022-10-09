<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">    
          <el-form-item label="文章分类">
            <el-select v-model="q.cate_id" placeholder="请选择分类" size="small">
            <!-- 因为整个表单要发给后台，去提前看眼vue代码里绑定的值需要什么，发现接口文档里要的分类id -->
              <el-option v-for="obj in cateList" :key="obj.id" :label="obj.cate_name" :value="obj.cate_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px;">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button type="primary" size="small" class="btn-pub" @click="showPubDialogFn">发表文章</el-button>
      </div>

      <!-- 文章表格区域 -->

      <!-- 分页区域 -->
    </el-card>
    <!-- 发表文章点击跳转区 -->
    <!-- 发表文章的 Dialog 对话框 -->
      <el-dialog title="发表文章" 
        :visible.sync="pubDialogVisible" 
        fullscreen 
        :before-close="handleClose">
        <!-- 发布文章的对话框 -->
        <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef" label-width="100px">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
             <el-select v-model="pubForm.cate_id" placeholder="请选择分类" style="width: 100%;">
                <!-- 因为整个表单要发给后台，去提前看眼vue代码里绑定的值需要什么，发现接口文档里要的分类id -->
                <el-option :label="item.cate_name" :value="item.id" v-for="item in cateList" :key="item.id">
                </el-option>
             </el-select>
         </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ArtList',
  data() {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
      },
      pubDialogVisible: false ,// 控制发表文章对话框的显示与隐藏false
      pubForm: { // 发布文章-表单的数据对象
         title: '',
         cate_id: ''
      },
      pubFormRules: { // 发布文章-表单的验证规则对象
         title: [
           { required: true, message: '请输入文章标题', trigger: 'blur' },
           { min: 1, max: 30, message: '文章标题的长度为1-30个字符', trigger: 'blur' }
         ],
          cate_id: [{ required: true, message: '请选择文章标题', trigger: 'blur' }]
       },
       cateList: [] // 文章分类
    }
  },
  methods: {
   // 发表文章按钮->点击事件->让添加文章对话框出现
    showPubDialogFn () {
        this.pubDialogVisible = true
    },
    // 对话框关闭前的回调
    async handleClose (done) {
       // 询问用户是否确认关闭对话框
       const confirmResult = await this.$confirm('此操作将导致文章信息丢失, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        // 取消了关闭-阻止住, 什么都不干
        if (confirmResult === 'cancel') return
        // 确认关闭
        done()
    },
    // 初始化文章分类的列表数据
    async initCateList() {
       const { data: res } = await this.$http.get('/my/cate/list')
       if (res.code === 0) {
           this.cateList = res.data
        }
    }
  },
  created() {
     this.initCateList()
    },
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
</style>

