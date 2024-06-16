<template>
    <div class="modal" v-if="isOpen" @click.self="closeModal">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <div class="h-full flex flex-col">
                <div class="flex flex-row gap-12 h-full">
                    <div class="flex flex-col gap-4" style="width:200px">
                        <ul class="user-sidebar flex flex-col gap-3 relative h-full">
                            <h2 class="mb-4 inline-block">User Sections</h2>
                            <li @click="toggleSidebar('UserInfo')" :class="{ active: activeSidebar === 'UserInfo' }"><span>User Info</span></li>
                            <li @click="toggleSidebar('PackageInfo')" :class="{ active: activeSidebar === 'PackageInfo' }"><span>Package Info</span></li>
                            <li @click="toggleSidebar('PaymentInfo')" :class="{ active: activeSidebar === 'PaymentInfo' }"><span>Payment Info</span></li>
                            <li @click="toggleSidebar('UserMInfo')" :class="{ active: activeSidebar === 'UserMInfo' }"><span>User IMeta</span></li>
                        </ul>
                    </div>

                    <!-- contents -->

                    <div v-if="activeSidebar === 'UserInfo'" class="w-full">
                        <h3 class="mb-5">Edit User Information:</h3>
                        <form class="form flex flex-col w-full gap-6">
                            <div class="flex flex-row w-full gap-4">
                                <div class="flex flex-col w-full">
                                    <label for="user-name">Firstname</label>
                                    <input type="text" id="user-name" name="firstname" :value="rowData.data.firstname">
                                </div>
                                <div class="flex flex-col w-full">
                                    <label for="last-name">Lastname</label>
                                    <input type="text" id="last-name" name="lastname" :value="rowData.data.lastname">
                                </div>
                            </div>
                            <div class="flex flex-row w-full gap-4">
                                <div class="flex flex-col w-full">
                                    <label for="password">New Password</label>
                                    <input type="password" id="password" name="password" placeholder="********">
                                </div>
                                <div class="flex flex-col w-full">
                                    <label for="confirm-password">Confirm Password</label>
                                    <input type="password" id="confirm-password" name="confirm_password"  placeholder="********">
                                </div>
                            </div>
                            <div class="flex flex-row w-full gap-4">
                                <div class="flex flex-col w-full">
                                    <label for="username">Username</label>
                                    <input type="text" id="username" name="username" :value="rowData.data.username">
                                    <span class="chAval">Check availability</span>
                                </div>
                                <div class="flex flex-col w-full">
                                    <label for="user-email">Email Address</label>
                                    <input type="email" id="user-email" name="email" :value="rowData.data.email">
                                    <span class="chAval">Check availability</span>
                                </div>
                            </div>
                            <button type="submit" @click.prevent="sendUserdata" class="main-button">Submit</button>
                        </form>
                    </div>
                    <div v-else-if="activeSidebar === 'PackageInfo'" class="w-full">
                        asdasddsa
                    </div>
                    <div v-else-if="activeSidebar === 'PaymentInfo'" class="w-full">
                        asdasdasd
                    </div>
                    <div v-else-if="activeSidebar === 'UserMInfo'" class="w-full">
                        asdasdasdasd
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<script>

export default {
    data() {
        return{
            activeSidebar: 'UserInfo',
        }
    },
    props: {
        isOpen: Boolean,
        rowData: Object
    },
    methods: {
        closeModal() {
            this.$emit('close')
        },
        toggleSidebar(id){
            this.activeSidebar = id;
        }
    }
}
</script>

<style scoped>
form{
    padding-bottom:30px;
}
.chAval{
    font-size:14px;
    color:blue;
    text-decoration: underline;
    margin:3px;
    cursor:pointer;
}
label{
    font-size:14px;
    margin:2px;
}
.user-sidebar:after{
    content:'';
    position:absolute;
    border-right:4px solid #fff;
    height:100%;
    top:0;
    bottom:0;
    right:-20px;
    margin:auto;
}
.user-sidebar li{
    padding:10px;
    background:#fff;
    cursor:pointer;
    transition:.2s ease-in-out all
}
.modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    align-items:center;
    justify-content: center;
}

/* Modal content */
.modal-content {
    background-color: #fefefe;
    padding: 20px;
    height:400px;
    width: 70%;
    background:#f9f9f9;
    overflow-y:auto;
    position:relative;
    border-radius:5px;
    box-shadow:0 0 15px #fff;
}

.close {
    color: #000;
    font-size: 28px;
    font-weight: bold;
    position:absolute;
    top:10px;
    right:25px;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.active {
  font-weight:600;
  margin-right:-17px;
}
</style>