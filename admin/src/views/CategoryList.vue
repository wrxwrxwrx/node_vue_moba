<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="$router.push(`edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items : []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/categories')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`是否确定删除${row.name}分类?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/categories/${row._id}`)
        console.log(res.data)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      })
    }
  }
}
</script>