<template>
        <div class="topbar-wrapper p-6 bg-white flex flex-row justify-between">
            <div v-if="userCatData" id="topbar-profile">
                <img :src="user.profilePictureUrl">
                <span>{{ user.firstname }} {{ user.lastname }}</span>
            </div>
            <div id="topbar-search">
                <img src="@/assets/images/search.png">
                <input type="text" name="search_dashboard" id="search_dashboard">
            </div>
            <div id="topbar-logout">
                <a @click="performLogout" href="javascript:void(0)">
                    <img src="@/assets/images/logout.png">
                </a>
            </div>
        </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';


export default {
    name: 'TopbarComponent',
    data() {
        return {};
    },
    computed: {
        // ...mapState(['userData']),
        ...mapState({
            userCatData: state => state.userCatData
        }),
        user(){
            return this.userCatData.userData;
        }
    },
    watch: {
        userCatData: {
            handler(newVal) {},
            immediate: true
        }
    },
    methods: {
        ...mapActions(['logout']),
        async performLogout() {
            await this.logout();
            this.$router.push('/login');
            window.location.reload();
        }
    },
};
</script>

<style scoped>
#topbar-search{
    display:flex;
    flex-direction:row;
    position:relative;
    height:max-content;
    width:70%;
}
#topbar-search img{
    position:absolute;
    left:10px;
    width:20px;
    height:20px;
    top:0;
    bottom:0;
    margin:auto;
}
#topbar-search input{
    width:90%;
}
#topbar-logout{
    display:flex;
    align-items:center;
    width:10%;
    justify-content:flex-end;
}
#topbar-logout img{
    height:20px;
}
.topbar-wrapper{
    margin-bottom:20px;
}
#topbar-profile img{
    width:40px;
    border-radius:100%;
}
#topbar-profile{
    display:flex;
    flex-direction: row;
    gap:20px;
    align-items:center;
    font-weight:700;
    width:20%;
}

</style>