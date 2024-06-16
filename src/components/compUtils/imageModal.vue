<template>
    <div v-id="show" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Item details:</h2>
            <div class="flex" style="max-height: 300px;">
                <img class="object-contain" :src="image.fileUrl" :alt="image.fileName">
            </div>
            <div class="flex flex-col gap-4">
                <div>
                    <label for="image-url">Image URL:</label>
                    <input id="image-url" class="w-full" type="text" :value="image.fileUrl">
                </div>
                <div>
                    <label for="image-name">Image Name:</label>
                    <input id="image-name" class="w-full" type="text" :value="image.fileName">
                </div>
                <div>
                    <a class="text-sm cursor-pointer" style="color:red" @click="deletePhoto">Delete</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axiosInstance from '@/api/axios';
export default {
    props:{
        show:{
            type: Boolean,
            required: true,
        },
        image: {
            type: Object,
            required: true,
        }
    },
    methods: {
        close(){
            this.$emit('close');
        },
        async deletePhoto(){
            try{
                const response = axiosInstance.delete(`/api/deleteMedia/${this.image.MediaID}`)
                this.$emit('delete', this.image.MediaID);
            } catch(error){
                console.error(error)
            }
        }
    }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
    height:auto;
    max-height:90%;
    max-width:80%;
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}

.modal-content img{
    width:auto;
    height:auto;
}


.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}
</style>