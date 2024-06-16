<template>
    <div id="gallery">
        <h1 class="mb-4">Gallery</h1>
        <div class="grid grid-cols-3 gap-3">
            <div class="images-got" v-for="image in images" :key="image.MediaID" @click="showImageModal(image)">
                <img :src="image.fileUrl">
            </div>
        </div>
        <ImageModal v-if="selectedImage" :show="showModal" :image="selectedImage" @close="closeModal" @delete="deleteImage"/>
    </div>
</template>

<script>
import axiosInstance from '@/api/axios';
import ImageModal from './compUtils/imageModal.vue'

export default {
    name: "MediaPage",
    data(){
        return{
            images: [],
            showModal: false,
            selectedImage: null,
        }
    },
    mounted() {
        this.fetchImages();
    },
    methods: {
        async fetchImages(){
            try{
                const response = await axiosInstance.get('/api/allMedia')
                this.images = response.data;
            }catch(error){
                console.error(error);
            }
        },
        showImageModal(image){
            this.selectedImage = image;
            this.showModal = true;
        },
        closeModal(){
            this.showModal = false;
            this.selectedImage = null;
        },
        deleteImage(imageId){
            this.images = this.images.filter(image => image.MediaID !== imageId);
            this.closeModal(); 
        }
    },
    components: {
        ImageModal
    }

}
</script>

<style scoped>
.images-got{
    height:300px;
    border:1px solid #d9d9d9;
}
.images-got img{
    height:100%;
    width:100%;
    object-fit:contain;
}
</style>