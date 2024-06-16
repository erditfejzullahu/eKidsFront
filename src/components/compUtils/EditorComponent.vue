<template>
    <h4>QuestionContent</h4>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @input="updateData"></ckeditor>
</template>

<script>
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import MyCustomUploadAdapterPlugin from '../../ckeditor/MyCustomUploadAdapter';

    export default {
        name: 'app',
        data() {
            return {
                editor: Editor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                extraPlugins:[MyCustomUploadAdapterPlugin],
            },
            
        };
    },
    methods: {
        updateData(){
            this.$emit('editorData', this.editorData)
        }
    }
}
</script>