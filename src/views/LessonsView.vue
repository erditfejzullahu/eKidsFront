<template>
    <div id="lessons" class="w-full rounded">
        <LessonsPage/>
    </div>
</template>

<script>

import LessonsPage from '@/components/LessonsPage.vue'

export default {
    name: 'LessonsView',
    components: {
        LessonsPage
    }
}
</script>