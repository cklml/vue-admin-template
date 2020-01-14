<template>
  <div class="source-container">
    <div class="header1">
      <div @click="current">
        <svg-icon v-if="icon" icon-class="minus" />
        <svg-icon v-if="!icon" icon-class="plus" />
        <svg-icon icon-class="yonghu" class="svg-yh" />
        <span>设备设施风险源</span>
      </div>
      <div class="source-tree">
        <el-tree v-show="icon" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      </div>
    </div>
    <div class="header1">
      <div @click="current1">
        <svg-icon v-if="icon1" icon-class="minus" />
        <svg-icon v-if="!icon1" icon-class="plus" />
        <svg-icon icon-class="yonghu" class="svg-yh" />
        <span>作业活动风险源</span>
      </div>
      <div class="source-tree">
        <el-tree v-show="icon1" :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      icon: true,
      icon1: true,
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    current() {
      this.icon = !this.icon
    },
    current1() {
      this.icon1 = !this.icon1
    }
  }
}
</script>
<style lang='scss' scoped>
.source-container {
  padding: 30px;
  .header1 {
    font-size: 16px;
    cursor: pointer;
    .svg-yh {
      font-size: 20px;
    }
    .source-tree {
        // padding-top: 10px;
        // padding-left: 20px;
        padding: 10px 0px 10px 20px
    }
  }
}
</style>
