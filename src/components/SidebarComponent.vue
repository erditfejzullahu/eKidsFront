<template>
    <ul class="flex flex-col gap-4">
        <li><img src="@/assets/images/dashboard.png"><router-link to="/">Dashboard</router-link></li>
        <li><img src="@/assets/images/teacher.png"><router-link to="/lessons">Lessons</router-link></li>
        <li><img src="@/assets/images/gallery.png"><router-link to="/media">Gallery</router-link></li>
        <li><img src="@/assets/images/literature.png"><router-link to="/stories">Stories</router-link></li>
        <li><img src="@/assets/images/wallet.png"><router-link to="/payments">Payments</router-link></li>
        <li><img src="@/assets/images/feedback.png"><router-link to="/comments">Comments</router-link></li>
        <li><img src="@/assets/images/user.png"><router-link to="/users">Users</router-link></li>
        <li><img src="@/assets/images/boxes.png"><router-link to="/packages">Packages</router-link></li>
        <li><img src="@/assets/images/setting.png"><router-link to="/settings">Settings</router-link></li>
    </ul>
</template>

<script>
export default {
    name: 'SidebarComponent',

}
</script>

<style scoped>
    ul{
        padding:20px;
        background:#fff;
        border-radius:5px;
    }
    ul li{
        display:flex;
        flex-direction:row;
        gap:10px;
    }
    ul li img{
        width:25px;
        height:25px;
    }
</style>