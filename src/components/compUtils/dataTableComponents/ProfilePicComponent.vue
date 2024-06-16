<template>
    <div class="usersProfilePic">
        <img :src="params.value" @click="test">
    </div>
</template>

<script>
export default {
    name: 'ProfilePicComponent',
    props: ['params'],
}
</script>


<style scoped>
    .usersProfilePic{
        height:100%;
        display:flex;
    }
    .usersProfilePic img{
        height:100%;
        width:100%;
        cursor:pointer;
        object-fit: cover;
    }
</style>