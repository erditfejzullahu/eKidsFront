<template>
  <button class="main-button" @click="openModal">View Details</button>
</template>

<script>
export default {
  props: ['rowData'], // Pass rowData as a prop
  methods: {
    openModal() {
      this.$emit('open-modal', this.rowData); // Emit open-modal event with rowData
    },
  },
};
</script>

<style scoped>
.main-button{
  min-width:100%!important;
}
</style>