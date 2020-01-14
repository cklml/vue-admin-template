<template>
  <div class="app-table-container">
    <AppSelect />
    <AppTable
      :border="true"
      :columns="columns"
      :data="listArr"
      :options-arr="optionsArr"
      :loading="loading"
      :selection="true"
      diy-class="diy_class"
      :option-open="true"
      @rowClick="rowClick"
      @selectClick="selectClick"
      @selectAll="selectAll"
      @row-dblclick="dblclick"
    />
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import AppTable from '../../components/Table/index.vue'
import axios from 'axios'
import Pagination from '@/components/Pagination'
import AppSelect from '@/components/Table/Select'
export default {
  components: { AppTable, Pagination, AppSelect },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      // 表头数组 [{cn: 'label', en: 'key',width: 120 }]
      columns: [
        { cn: '姓名', en: 'taskname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: 'name', en: 'projectname', width: 220 },
        { cn: '日期', en: 'ts', width: 180 }
      ],
      optionsArr: ['update', 'del'],
      listArr: [
        {
          name: '张三',
          sex: '男',
          date: '1994-02-23 00:00:00'
        },
        {
          name: '李四',
          sex: '女',
          date: '1994-02-23 00:00:00'
        },
        {
          name: '王五',
          sex: '女',
          date: '1994-02-23 00:00:00'
        },
        {
          name: '赵六',
          sex: '男',
          date: '1994-02-23 00:00:00'
        }
      ],
      loading: false
    }
  },
  computed: {},
  watch: {},
  created() {
    const listQuery = this.listQuery
    this.fetch(listQuery)
  },
  mounted() {},
  methods: {
    fetch(listQuery) {
      this.loading = true
      axios({
        method: 'post',
        url: 'http://106.3.44.153:8204/api/Task/GetTaskData',
        headers: {
          'Authorization':
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1ZTE3YmQ4ZWExMTQ1YjA3OGMyYmE4MDhhYzUyYmU5IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1Nzg4OTcxMzAsImV4cCI6MTU3ODkwMDczMCwiaXNzIjoiaHR0cDovLzEwNi4zLjQ0LjE1Mzo4MjA3IiwiYXVkIjpbImh0dHA6Ly8xMDYuMy40NC4xNTM6ODIwNy9yZXNvdXJjZXMiLCJsaW9uYXBpIl0sImNsaWVudF9pZCI6Inl3dGx3c216Iiwic3ViIjoiemhnZCIsImF1dGhfdGltZSI6MTU3ODg5NzEzMCwiaWRwIjoibG9jYWwiLCJpZCI6IjUxZWYzY2ExLTE2ODQtNDVlYS1hYzA0LWY0ZTUwZmZjNDNiNSIsImd1aWQiOiI1MWVmM2NhMS0xNjg0LTQ1ZWEtYWMwNC1mNGU1MGZmYzQzYjUiLCJjb21pZCI6IjFlYjgzOTBlOGJkMDQyMDc5ZmI0YWMyMzU1YmE5ZDQ3IiwiY29tbmFtZSI6IuS8jemAmuaZuuaFp-W3peWcsOa8lOekuuWIhuWMheWFrOWPuCIsImxvZ2luaWQiOiJ6aGdkIiwibmFtZSI6IuaZuuaFp-W3peWcsOeuoeeQhuWRmCIsImdlbmRlciI6IjAiLCJkZXBhcnRpZCI6IiIsImRlcGFydG5hbWUiOiIiLCJzdGF0ZSI6IjAiLCJpZGVuIjoiNDEwMzIxMTk3OTEyMTIwNDcxIiwicm9sZWlkIjoiNjAxYmVjZTkzZDA4NDU5NDliN2ZiNmZjMWYyZTdlNmMiLCJyb2xlbmFtZSI6IuWFrOWPuOeuoeeQhuWRmCIsImlzc3lzcm9sZSI6IjAiLCJwcm92aW5jZWlkIjoiIiwiaW5kdXN0cnl0eXBlIjoiIiwicGhvbmUiOiIxODAyMjgwMTExMSIsInByb2plY3Rjb2RlIjoiIiwidGVhbXN5c25vIjoiIiwic2hvd3N5c25hbWUiOiIiLCJkZXZpY2Vmcm9tIjoiMSIsIm9hdXRoIjoiIiwidHlwZSI6IjEiLCJjb210eXBlIjoiMSIsIm1haW5zdWJ0eXBlIjoiMSIsInByb3ZpbmNlaWRzIjoiIiwicHJvdmluY2VuYW1lcyI6IiIsImluZHVzdHJ5dHlwZXMiOiIiLCJpbmR1c3RyeXR5cGVuYW1lcyI6IiIsImNvbWxldmVsIjoiIiwiZW5jcnkiOiJJSUNhaW5GSWVuUkIyVnAxaXViYU9BPT0iLCJ5d3RqYXZhdG9rZW4iOiJ7XCJhY2Nlc3NfdG9rZW5cIjpcIjA4NTMwZjkzLTU4NTEtNDU2ZS1hY2NhLWIyYjJiNTBkMGE4MVwiLFwidG9rZW5fdHlwZVwiOlwiYmVhcmVyXCIsXCJyZWZyZXNoX3Rva2VuXCI6XCJkMmZmNWRhZC0xZmIwLTQwMDMtOGUzYy0xYWNkNzMwNmY3ODRcIixcImV4cGlyZXNfaW5cIjoyMzk5NTU4LFwic2NvcGVcIjpcImFsbFwifSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJsaW9uYXBpIl0sImFtciI6WyJjdXN0b20iXX0.Fm_rly3Qv1lTGIkqiKJ7Fg0Ig1HHi_r4k7hgecMe_BfP_6VBa7erOT_-MLe6Wp6RmjoNgO4z8_OP69hc4zNCcNFRVZ3MNrO5QqAnDt6R3zxOsIMGjFC-9lgs6irUYf9ViJ3AOUN1X-vdD8tijwzYxZtt8fT-IxIJl84mVd-j9xVBdHI571mqYjijQlGuijyUcxuZcgTMF4WMw6ElAM5sIxZhEtFkdZSevTSUINLLctMXqXGdNSnudrAxYA2A4ycwwjTs5bAqWrwLIWnQUFrdDppwxB3vvB66IVQrBM4dtuVyotHXbDYeh37dYJTABCQmLnE0Ae458rRJqpl1PvNzAw'
        },
        data: {
          comid: '1eb8390e8bd042079fb4ac2355ba9d47',
          projectid: '',
          managerid: '',
          checkpersonid: '',
          tasktype: '',
          startdate: '2019-04-09',
          enddate: '2020-04-13',
          pageindex: listQuery.page,
          pagesize: listQuery.limit,
          teamsysno: '',
          encry: 'IICainFIenRB2Vp1iubaOA=='
        }
      }).then(res => {
        // console.log(res)
        this.total = res.data.total
        this.listArr = res.data.rows
        this.loading = false
      })
    },
    getList() {
      this.fetch(this.listQuery)
      // console.log(this.listQuery)
    },
    rowClick(row, event) {
      console.log('rowClick', row, event)
    },
    selectClick(selection, row) {
      console.log('selectClick', selection, row)
    },
    selectAll(all) {
      console.log('selectAll', all)
    },
    dblclick(row, column, event) {
      console.log('dbclick', row, column, event)
    }
  }
}
</script>
<style lang='scss' scoped>
.app-table-container {
  padding: 20px;
}
</style>
