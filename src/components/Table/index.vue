<template>
  <div class="app-table">
    <div class="dynamic_table" :class="diyClass">
      <el-table
        v-loading="loading"
        :border="border"
        :data="data"
        :element-loading-background="loadBg"
        empty-text="暂无数据"

        @select="selectClick"
        @row-click="rowClick"
        @select-all="selectAll"
      >
        <el-table-column type="index" fixed label="序号" width="55" />
        <el-table-column v-if="selection" type="selection" width="55" fixed />
        <el-table-column
          v-for="(item,index) in columns"
          :key="index"
          show-overflow-tooltip
          :prop="item.en"
          :label="item.cn"
          :width="item.width || 'auto'"
          header-align="center"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row[item.en] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="optionsArr && optionsArr.length>0 || optionOpen"
          label="操作"
          width="150"
          column-key="option"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              v-if="arrIncludes(optionsArr,'update')"
              size="mini"
              type="primary"
              @click="updateRow(scope.row)"
            >编辑</el-button>
            <el-button
              v-if="arrIncludes(optionsArr,'del')"
              size="mini"
              type="danger"
              @click="delRow(scope.row)"
            >删除</el-button>
            <!-- 自定义操作按钮 -->
            <slot name="options" :scopeRow="scope.row" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTable',
  components: {},
  props: {
    // 表头数组 [{cn: 'label', en: 'key',width }]
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 行数据
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 是否开启option
    optionOpen: {
      type: Boolean,
      default: false
    },
    // 操作数组 ['update','del']
    optionsArr: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 自定义class
    diyClass: {
      type: String,
      default: ''
    },
    // 加载中背景颜色
    loadBg: {
      type: String,
      default: ''
    },
    // 多选
    selection: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
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
    updateRow(row) {
      this.$emit('updateRow', row)
    },
    delRow(row) {
      this.$emit('delRow', row)
    },
    arrIncludes(arr, item) {
      return arr.includes(item)
    },
    rowClick(row, column, event) {
      this.$emit('rowClick', row, event, column)
    },
    selectClick(selection, row) {
      this.$emit('selectClick', selection, row)
    },
    selectAll(selection) {
      this.$emit('selectAll', selection)
    }
  }
}
</script>
<style lang='scss' scoped>
.app-table {
  width: 100%;
  .dynamic_table {
    width: 90%;
  }
}
</style>
