<template>
    <div id="add-lessons" class="p-6">
        <h1>Add a Lesson</h1>
        <form class="lesson-add-form flex flex-col gap-4 mt-6">
            <div class="flex flex-row justify-between gap-5">
                <div class="flex flex-col w-full">
                    <label for="lesson-name">Lesson Name:</label>
                    <input type="text" id="lesson-name" v-model="lessonName" required>
                </div>
                <div class="flex flex-col w-full">
                    <label for="lesson-category">Lesson Category</label>
                    <select id="lesson-category" v-model="lessonCategory" required>
                        <option value="">Select a category</option>
                        <option v-if="userCatData" v-for="(categories, index) in category" :key="index"
                            :value="categories.CategoryID">{{ categories.categoryName }}</option>

                    </select>
                </div>
            </div>
            <h2 class="mt-6">Add Questions</h2>

            <EditorComponent @editorData="updateEditorData" />

            <div class="grid grid-cols-2 justify-between add-lesson-wrapper">
                <div :class="{ 'top-border': qItem > 2 }" class="shto-pyetje relative"
                    v-for="(qItem, qIndex) in questionIndex" :key="qIndex">
                    <div class="flex flex-row w-full gap-5">
                        <div class="flex flex-col w-11/12">
                            <label :for="'question' + (qIndex + 1)">Question {{ qIndex + 1 }}:</label>
                            <input type="text" :id="'question' + (qIndex + 1)"
                                v-model="lesson[0].questions[qIndex]">
                        </div>
                        <div class="flex flex-col w-auto">
                            <label :for="'type' + (qIndex + 1)">Type of Question {{ qIndex + 1 }}:</label>
                            <select :id="'type' + (qIndex + 1)" v-model="lesson[0].types[qIndex]">
                                <option value="checkbox">Multiple Choices</option>
                                <option value="radio">Single Choice</option>
                                <option value="text">Textual Answer</option>
                                <option value="dropdown">Dropdown Answer</option>
                            </select>
                        </div>
                    </div>
                    <div class="question-part w-full mt-4" v-for="(item, index) in questionToBeAdded[qIndex]"
                        :key="index">
                        <div :id="'divAnswer' + (qIndex + 1)  + '-' + (index + 1)"
                            :ref="'divAnswer' + (qIndex + 1)  + '-' + (index + 1)">
                            <label :ref="'answer' + (index + 1)" :for="'answer' + (index + 1)">Answer {{ index + 1
                                }}:</label>
                            <input type="text" :ref="'answer' + (index + 1)" :id="'answer' + (index + 1)"
                                v-model="lesson[0].answers[qIndex][index + 1]">
                            <a v-if="questionToBeAdded[qIndex] !== 1 && index !== 0" href="javascript:void(0)"
                                :ref="'answer' + (index + 1)" @click="questionToBeAdded[qIndex]--"
                                class="remove-question">&times;</a>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between items-end">
                        <div>
                            <a href="javascript:void(0)" class="main-button mt-4 m-auto" @click="addAnswer(qIndex)">Add
                                Answers</a>
                        </div>
                        <div class="flex flex-col mt-4">
                            <label :for="'correct' + (qIndex + 1)">Correct Answer for Q{{ qIndex + 1 }}</label>
                            <select :id="'correct' + (qIndex + 1)" :value="lesson[0].correctAnswer[qIndex]"
                                v-model="lesson[0].correctAnswer[qIndex]">
                                <option v-for="(cItem, cIndex) in questionToBeAdded[qIndex]" :key="cIndex"
                                    :value="cIndex + 1"> {{ cIndex + 1 }} </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div id="add-questions">
                <a @click="addQuestion(questionIndex)" href="javascript:void(0)" class="main-button">Add More
                    Questions</a>
            </div>
            <div class="mt-4 flex justify-end w-full" style="border-top:2px solid #d9d9d9;">
                <a href="javascript:void(0)" class="main-button mt-6" @click="sendLesson">Add new Lesson</a>
            </div>

        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EditorComponent from './compUtils/EditorComponent.vue'
import axiosInstance from '@/api/axios';

export default {
    name: 'LessonsPage',
    data() {
        return {
            editorData: '',
            questionIndex: [1],

            questionToBeAdded: [3],

            lessonName: '',
            lessonCategory: null,

            questionNames: [],
            lesson: [{
                questions: [],
                types: [{}],
                answers:[{}],
                correctAnswer: [],
            }]
        }
    },
    methods: {
        async sendLesson() {
            try {
                const response = await axiosInstance.post('/api/Lessons', {
                    "LessonName": this.lessonName,
                    "CategoryID": this.lessonCategory,
                    "LessonType": JSON.stringify(this.lesson[0].types),
                    "LessonContent": this.editorData,
                    "LessonQuestions": JSON.stringify(this.lesson[0].questions),
                    "LessonAnswers": JSON.stringify(this.lesson[0].answers),
                    "CorrectAnswers": JSON.stringify(this.lesson[0].correctAnswer)
                })
                console.log("Response:", response);
            }catch(error){
                console.error(error)
            }
        },
        updateEditorData(updatedData){
            this.editorData = updatedData;
        },
        testinfo(){
            console.log(this.lesson[0].types)
        },
        removeAnswer(questionIndex, answerIndex) {

            answerIndex = answerIndex.replace(/[^\d.]/g, '');
            
            let refElements = this.$refs['divAnswer' + (questionIndex + 1) + '-' + answerIndex]
            
            let indeksiPytjes = questionIndex;
            let indeksiPergjigjes = answerIndex

            if (refElements && refElements.length > 0) {
                // Remove the answer element from the DOM
                let divAnswerElement = this.$refs['divAnswer' + (indeksiPytjes + 1) + '-' + indeksiPergjigjes][0];
                if (divAnswerElement && divAnswerElement.parentNode) {
                    divAnswerElement.parentNode.removeChild(divAnswerElement);
                }
            }
        },
        addAnswer(item) {

            if(!this.lesson[0].answers[item]){
                this.lesson[0].answers.push(this.lesson[0].answers[item])
                this.lesson[0].answers[item] = {};
            }

            if (this.questionToBeAdded[item]) {
                this.questionToBeAdded[item]++;
            } else {
                this.questionToBeAdded.push(this.questionToBeAdded[item]);
                this.questionToBeAdded[item] = 2;
                
                // this.questionToBeAdded[item]++;
            }
            console.log(this.questionToBeAdded)
        },
        addQuestion(item) {
            let currentIndex = item[item.length - 1];
            this.questionIndex.push(this.questionIndex[currentIndex])
            this.questionIndex[currentIndex] = this.questionIndex.length;
            currentIndex++;
            console.log(this.questionIndex)
        }
    },
    computed: {
        ...mapState({
            userCatData: state => state.userCatData
        }),
        category(){
            return this.userCatData.categories;
        },
        updateQuestionArray() {
            let updateData = this.removeAnswer(sendData);
        }
    },
    components: {
        EditorComponent,
    },
    
}
</script>

<style scoped>

.top-border:after{
    content:'';
    position:absolute;
    top:-20px;
    left:0;
    width:200%;
    margin:auto;
    border-top:2px solid #d9d9d9;
}
.top-border{
    margin-top:30px!important;
}
.shto-pyetje{
    background:#fff;
    margin:20px;
}

.question-part div {
    display: flex;
    flex-direction: column;
    position: relative;
}

.remove-question {
    position: absolute;
    font-size: 24px;
    font-weight: 700;
    bottom: 0;
    right: 10px;
}

#add-questions {
    margin: auto;
    margin-top: 40px;
}

#add-questions .main-button {
    width: 500px !important;
}

#add-lessons {
    background: #fff;
}
</style>