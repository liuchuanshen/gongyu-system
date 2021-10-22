<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import { getMessage } from '@/api/data'
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
      }
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
      getMessage().then(response => {
        // console.log('response.data.result', response.data.data)
        this.$bus.$emit('MessageBox', response.data.data)
      })
    }
  }
}



// db.getCollection('messagebox').insert([{id:"1",houseId:'101',name:'陈达明',msg:'门锁有点坏了，麻烦来修理一下',date:'2021-10-22 10:12:22',process:[{id:'1',status:'0',statusStr:'待处理',date:'2021-10-22 10:12:22'}]}])



</script>



