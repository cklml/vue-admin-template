<template>
  <div class="app-select">
    <el-button v-if="select.add" type="primary" size="small" @click="rowAdd">添加</el-button>
    <el-button v-if="select.edit" type="success" size="small" @click="rowEdit">编辑</el-button>
    <!-- <el-button type="info">删除</el-button> -->
    <!-- <el-button type="warning">警告按钮</el-button> -->
    <el-button v-if="select.del" type="danger" size="small" @click="rowDel">删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  components: {},
  props: {
    select: {
      type: Object,
      required: true,
      default: function () {
        return {
          add: true,
          edit: true,
          del: true
        }
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    rowAdd() {
      this.$emit('rowAdd')
    },
    rowEdit() {
      this.$emit('rowEdit')
    },
    rowDel() {
      this.$emit('rowDel')
    }
  }
}
</script>
<style lang='scss' scoped>
.app-select {
  margin-bottom: 20px;
}
</style>
