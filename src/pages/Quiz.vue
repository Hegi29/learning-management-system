<template>
    <div class="p-6">
        <section class="bg-white p-6 rounded shadow mb-8">
            <h1 class="text-2xl font-bold mb-4">Course Quiz</h1>

            <div v-for="(question, index) in questions" :key="question.id" class="mb-6">
                <h3 class="text-lg font-semibold">{{ question.text }}</h3>

                <div class="mt-2">
                    <template v-if="question.type === 'multiple'">
                        <div v-for="(option, idx) in question.options" :key="idx" class="flex items-center mb-2">
                            <input type="radio" :id="`question-${question.id}-option-${idx}`"
                                v-model="answers[question.id]" :value="option" class="mr-2" />
                            <label :for="`question-${question.id}-option-${idx}`">{{ option }}</label>
                        </div>
                    </template>
                    <template v-else-if="question.type === 'multiple-choice'">
                        <div v-for="(option, idx) in question.options" :key="idx" class="flex items-center mb-2">
                            <input type="checkbox" :id="`question-${question.id}-option-${idx}`"
                                v-model="answers[question.id]" :value="option" class="mr-2" />
                            <label :for="`question-${question.id}-option-${idx}`">{{ option }}</label>
                        </div>
                    </template>
                </div>
            </div>

            <div v-if="error" class="text-red-500 mb-4">
                {{ error }}
            </div>

            <button @click="submitQuiz" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Submit Quiz
            </button>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface Question {
    id: number;
    text: string;
    type: 'multiple' | 'multiple-choice';
    options: string[];
    correctAnswer?: string | string[];
}

export default defineComponent({
    setup() {
        const route = useRoute();
        const questions = ref<Question[]>([]);
        const answers = ref<{ [key: number]: string | string[] }>({});
        const error = ref<string | null>(null);

        const fetchQuiz = async () => {
            const mockQuestions: Question[] = [
                {
                    id: 1,
                    text: 'What is Vue.js?',
                    type: 'multiple',
                    options: ['A JavaScript framework', 'A CSS framework', 'A backend technology'],
                    correctAnswer: 'A JavaScript framework',
                },
                {
                    id: 2,
                    text: 'Which of the following are JavaScript frameworks?',
                    type: 'multiple-choice',
                    options: ['Vue.js', 'Angular', 'React', 'Bootstrap'],
                    correctAnswer: ['Vue.js', 'Angular', 'React'],
                },
            ];
            questions.value = mockQuestions;
        };

        const submitQuiz = () => {
            for (const question of questions.value) {
                if (!answers.value[question.id] || (Array.isArray(answers.value[question.id]) && answers.value[question.id].length === 0)) {
                    error.value = 'Please answer all the questions before submitting!';
                    return;
                }
            }

            error.value = null;

            console.log('Quiz submitted:', answers.value);
            alert('Quiz submitted successfully!');
        };

        onMounted(() => {
            fetchQuiz();
        });

        return { questions, answers, submitQuiz, error };
    },
});
</script>

<style scoped>
.bg-white {
    background-color: white;
}
</style>