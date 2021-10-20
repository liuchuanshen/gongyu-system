<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import {fetchWarningMsg} from '@/api/article'
// import { testURL } from 'jest.config'
export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
       listQuery: {
        page: 1,
        limit: 10
      },
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.getList()
    // this.getPath()
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    // getPath() {
    //   if (this.$route.path === '/dashboard') {
    //     this.$bus.$emit('MessageBox')
    //   }
    // },
    getList() {
      this.listLoading = true
      fetchWarningMsg(this.listQuery).then(response => {
        console.log('list',response)
        this.$bus.$emit('MessageBox',response.data)
      })
    },
  }
}
</script>
