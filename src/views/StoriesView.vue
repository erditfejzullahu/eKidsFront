<template>
    <div id="stories-page" class="bg-white w-full rounded">
        <StoriesPage/>
    </div>
</template>

<script>
import StoriesPage from '@/components/StoriesPage.vue'

export default {
    name: 'StoriesView',
    components: {
        StoriesPage
    }
}
</script>