<template>
  <header v-if="existToken">
    <Topbar/>
  </header>
  <div class="page-content container mx-auto">
  <aside v-if="existToken">
    <SidebarComponent/>
  </aside>
  <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Topbar from '@/components/TopbarComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'

export default {
  name: 'defaultApp',
  components: {
    Topbar,
    SidebarComponent
  },
  computed: {
    ...mapState(['existToken', 'isExpired', 'userCatData'])
  },
  mounted() {
    this.onStart()
  },
  watch: {
    existToken(newToken, oldToken) {
      //console.log('existToken changed:', newToken);
      this.onStart();
    },
    isExpired(newExpired, oldExpired) {
      //console.log('isExpired changed:', newExpired);
      this.onStart();
    },
    userCatData(newData, oldData) {
      this.onStart();
    }
  },
  methods: {
    ...mapActions(['fetchUserData']),
    onStart(){
      if(this.userCatData == null && this.existToken && !this.isExpired){
        this.fetchUserData();
      }
    }
  }
}

</script>

<style>



.page-content{
  display:flex;
  flex-direction:row;
  gap:20px;
}
aside{
  min-width: 200px !important;
}

input[type="text"], input[type="password"], input[type="email"], select{
  border:2px solid #f9f9f9;
  box-shadow:0 0 5px #d9d9d9;
  -webkit-box-shadow:0 0 5px #d9d9d9;
  border-radius:5px;
  height:35px;
  padding:10px;
}

input[type="text"]:focus, input[type="password"]:focus, input[type="email"]:focus, select{
  box-shadow:0 0 10px #d9d9d9;
  outline:none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}

body{
  background:#f9f9f9;
  /* margin:20px!important; */
}


nav a.router-link-exact-active {
  color: #42b983;
}
</style>
