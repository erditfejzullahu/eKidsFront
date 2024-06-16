<template>

    <div class="grid grid-cols-3 gap-4 w-full" id="dashboard-boxes">
        <div>
            <span class="font-normal">Registered Users</span>
            <span class="font-bold">{{ realData.registeredUsers }}</span>
        </div>
        <div>
            <span class="font-normal">Total Lessons</span>
            <span class="font-bold">{{ dummyData.totalLessons }}</span>
        </div>
        <div>
            <span class="font-normal">Total Stories</span>
            <span class="font-bold">{{ dummyData.totalStories }}</span>
        </div>
        <div>
            <span>Total Profit</span>
            <span class="font-bold">{{ dummyData.totalProfit }}</span>
        </div>
        <div>
            <span class="font-normal">Realtime Users</span>
            <span class="font-bold">{{ dummyData.realtimeUsers }}</span>
        </div>
        <div id="comment-section" style="height:100%">
            <div class="font-normal">Comments</div>
            <!-- <span class="font-bold">{{ dummyData.commentsMade }}</span> -->
            <swiper
            :slides-per-view="1"
            :space-between="50"
            :loop=true
            :navigation = true
            :pagination=true
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            >
          <swiper-slide>Slide 1</swiper-slide>
          <swiper-slide>Slide 2</swiper-slide>
          <swiper-slide>Slide 3</swiper-slide>
        </swiper>

        </div>
    </div>



</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/element/css/autoplay'
import axiosInstance from '../api/axios';

export default {

    name: 'DashboardPage',
    data() {
        return {
            dummyData: {
                registeredUsers: 12345,
                totalLessons: 84,
                totalStories: 45,
                totalProfit: '800$',
                realtimeUsers: 28,
                commentsMade: 'slider'
            },
            realData: {
                registeredUsers: 0,
            }
        }
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        //console.log(swiper);
      };
      const onSlideChange = () => {
        //console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        };
    },
    mounted() {
        axiosInstance.get('/api/Users/allUsers')
            .then(response => {
                this.realData.registeredUsers = response.data.length;
                console.log(response.data);
            })
            .catch(error => {
                console.error('error in retrieving users', error);
            })
    },
}
</script>

<style scoped>
#comment-section div{
    height:auto!important;
    padding:0!important
}
    #dashboard-boxes div{
        background:#fff;
        display:flex;
        flex-direction:column;
        gap:20px;
        align-items:center;
        justify-content: center;
        width:100%;
        padding:20px;
        height:150px;
        border-radius:5px;
        overflow:hidden;
    }
</style>