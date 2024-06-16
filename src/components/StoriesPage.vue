<template>
    <div class="p-6">
        <h1>Add Stories</h1>
        <form class="flex flex-col gap-4 mt-6">
            <div class="flex flex-row justify-between gap-5">
                <div class="flex flex-col w-full">
                    <label for="storie-name">Storie Name:</label>
                    <input type="text" id="storie-name" v-model="storieName" required>
                </div>
                <div class="flex flex-col w-full">
                    <label for="storie-category">Storie Category</label>
                    <select id="storie-category" v-model="storieCategory" required>
                        <option value="perralla">Përralla</option>
                        <option value="aventurat_kafsheve">Aventurat e kafshëve</option>
                        <option value="histori_per_miqesi">Histori për miqësi</option>
                        <option value="mjedis_natyre">Mjedis dhe natyrë</option>
                        <option value="magji_fantazi">Magji dhe fantazi</option>
                        <option value="princat_princeshat">Princat dhe princeshat</option>
                    </select>
                </div>
            </div>
            <div class="flex flex-row justify-between gap-5">
                <div class="flex flex-col w-full">
                    <label for="storie-excerpt">Storie Excerpt</label>
                    <input type="text" id="storie-excerpt" v-model="storieDescription">
                </div>
                <div class="flex flex-col w-full">
                    <label for="storie-url">Storie URL</label>
                    <input type="text" id="storie-url" v-model="storieURL">
                </div>
            </div>
            <div class="flex flex-row justify-between gap-5">
                <div class="flex flex-col w-full">
                    <label for="storie-featured">Storie Image</label>
                    <input type="file" id="storie-featured" @change="handleFile($event)">
                </div>
                <div class="flex flex-col w-full">
                    <div class="storieFeaturedImg">
                        <img :src="imageURL">
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axiosInstance from '@/api/axios';

export default {
    name: 'StoriesPage',
    data() {
        return {
            storieName: '',
            storieCategory: '',
            storieDescription: '',
            storieURL: '',
            imageURL: '',
        }
    },
    methods: {
        async sendStorie(){
            try{
                const response = await axiosInstance.post('/api/Stories', {
                    "StorieName": this.storieName,
                    "StorieCategory": this.storieCategory,
                    "StorieDescription": this.storieDescription,
                    "storieURL": this.storieURL
                })
            } catch (error) {
                console.error(error);
            }
        },
        async handleFile(event) {
            const file = event.target.files[0]
            const fileName = event.target.files[0].name;
            const reader = new FileReader();
            reader.onload = () => {
                const base64string = reader.result;
                this.uploadFile(base64string, fileName);
            }
            reader.readAsDataURL(file);

        },
        async uploadFile(base64string, fileName) {
            try {
                const response = await axiosInstance.post('/api/File', {
                    "fileName": fileName,
                    "fileBase64": base64string,
                })
                console.log(response.data)
                this.imageURL = response.data.theFile.fileUrl
            }catch(error){
                console.error('file ',error)
            }
        }
    },
}
</script>