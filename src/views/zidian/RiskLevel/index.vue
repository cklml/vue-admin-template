<template>
  <div class="app-risklevel">
    <AppSelect :select="select" @rowDel="delRow" @rowAdd="rowAdd" @rowEdit="rowEdit" />
    <AppTable
      :columns="columns"
      :border="true"
      :data="listArr"
      :loading="loading"
      :selection="true"
      diy-class="diy_class"
      :option-open="false"
      @updateRow="updateRow"
      @selectClick="selectClick"
    />
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form>
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item label="公司名称">
              <el-select v-model="form.region" placeholder="请选择公司">
                <el-option label="公司一" value="shanghai" />
                <el-option label="公司二" value="beijing" />
              </el-select>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="风险等级">
              <el-select v-model="form.sec" placeholder="请选择">
                <el-option label="低风险" value="d" />
                <el-option label="一般风险" value="y" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AppTable from '@/components/Table/index.vue'
import axios from 'axios'
import Pagination from '@/components/Pagination'
import AppSelect from '@/components/Table/Select'
export default {
  components: { AppTable, Pagination, AppSelect },
  data() {
    return {
      form: {},
      dialogVisible: false,
      title: '添加',
      select: {
        add: true,
        edit: true,
        del: true
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      // 表头数组 [{cn: 'label', en: 'key',width: 120 }]
      columns: [
        { cn: '姓名', en: 'taskname', width: 180 },
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
      // optionsArr: ['update', 'del'],
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
      loading: false,
      guids: []
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
          Authorization:
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
    updateRow(row) {
      console.log('updateRow', row)
    },
    delRow(row) {
      console.log('del')
      console.log('delRow', this.guids)
    },
    rowAdd() {
      console.log('rowAdd')
      this.title = '添加'
      this.dialogVisible = true
    },
    rowEdit() {
      console.log('rowEdit', this.guids.length)
      if (this.guids.length === 0) {
        this.$notify.info({
          title: 'Tips',
          message: '请勾选你需要编辑的信息'
        })
      } else if (this.guids.length > 1) {
        this.$notify.info({
          title: 'Tips',
          message: '只能勾选一条'
        })
      } else {
        this.dialogVisible = true
        this.title = '编辑'
      }
    },
    selectClick(sec, row) {
      console.log('selectClick', sec, row)
      this.guids = sec.map(v => {
        return v.guid
      })
      console.log(this.guids)
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang='scss' scoped>
.app-risklevel {
  padding: 20px;
}
.app-risklevel /deep/ .el-dialog {
  width: 50% !important;
}
</style>
