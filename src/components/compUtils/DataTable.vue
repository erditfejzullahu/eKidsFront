<template>
    <ag-grid-vue :rowData="rowData"
        :columnDefs="columnDefs" 
        style="height: 500px; 
        width:100%"
        :rowHeight="70"
        class="ag-theme-quartz"
        @cell-clicked="openUserModal"
        >
    </ag-grid-vue>
    <input ref="profileInput" v-show="false" type="file" @change="changeProfilePic($event, this.picFuncParams)">
    
    <UserModal :isOpen="isModalOpen" :rowData="selectedRow" @close="closeModal" />
</template>

<script>

import { ref } from 'vue';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { AgGridVue } from "ag-grid-vue3";
import axiosInstance from '@/api/axios';
import DataButtonComponent from './dataTableComponents/DataButtonComponent.vue'
import ProfilePicComponent from './dataTableComponents/ProfilePicComponent.vue'
import UserModal from './dataTableComponents/UsersModal.vue'

export default {
    data(){
        return{
            isModalOpen: false,
            selectedRow: null,
            picFuncParams: null,
        }
    },
    components: {
        UserModal,
        "ag-grid-vue": AgGridVue,
        DataButtonComponent,
        ProfilePicComponent
    },
    setup() {
        // Column Definitions: Defines the columns to be displayed.
        const columnDefs = ref([
            {
                headerName: "ProfilePic",
                field:'profilePictureUrl',
                colId: "profilePic",
                cellRenderer: "ProfilePicComponent", 
                flex: 0.40,
                cellStyle: { textAlign: 'center', padding: '5px', boxShadow: '0 0 5px #000' },
            },
            {
                headerName: "Name",
                valueGetter: (p) => p.data.firstname + " " + p.data.lastname,
                flex: 1,
                cellStyle: { display: 'flex', alignItems: 'center'},
            },
            {
                headerName: "Role",
                field:"role",
                flex: 1,
                cellStyle: { display: 'flex', alignItems: 'center'},
            },
            {
                headerName: "Edit User",
                cellRenderer: "DataButtonComponent",
                colId: "edituser",
                flex:1,
                cellStyle: { display: 'flex', alignItems: 'center', padding: '5px'},
            }
        ]);

        // Row Data: The data to be displayed.
        const rowData = ref([]);
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/Users/allUsers');
                console.log(response.data);
                rowData.value = response.data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return {
            columnDefs,
            rowData,
        };
    },
    methods: {
        closeModal() {
            this.isModalOpen = false;
        },
        openUserModal(params) {
            if (params.column.colId === 'edituser') {
                this.selectedRow = params;
                this.isModalOpen = true;
                console.log(this.selectedRow);
            }else if(params.column.colId === 'profilePic') {
                this.picFuncParams = params;
                this.$refs.profileInput.click();
            }
        },
        async changeProfilePic(event, picFuncParams){
            const passID = picFuncParams.data.id;
            const file = event.target.files[0]
            const reader = new FileReader();
            reader.onload = () => {
                const base64string = reader.result;
                this.uploadFile(base64string, passID);
            }
            reader.readAsDataURL(file);
        },
        async uploadFile(base64string, passID){
            try{
                const response = await axiosInstance.put(`/api/Users/${passID}/profile-picture`, {
                    "base64Profile": base64string,
                })
                console.log(response.data)
            }catch(error){
                console.error('profilepic ', error)
            }
        }
    }
};

</script>