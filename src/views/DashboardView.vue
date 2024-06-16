<template>
  <div id="home" class="w-full rounded">
    <DashboardPage/>
  </div>
</template>

<script>
// @ is an alias to /src

import DashboardPage from '@/components/DashboardPage.vue'

export default {
  name: 'DashboardView',
  components: {
    DashboardPage
  }
}
</script>
