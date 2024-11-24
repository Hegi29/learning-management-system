<template>
    <div class="p-6">
        <section class="bg-white p-6 rounded shadow mb-8">
            <h1 class="text-2xl font-bold mb-4">{{ lesson?.title }}</h1>

            <div class="mb-4">
                <template v-if="lesson?.type === 'video'">
                    <video controls class="w-full rounded">
                        <source :src="lesson.content" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </template>
                <template v-else-if="lesson?.type === 'pdf'">
                    <VPdfViewer :src="pdfSrc" :zoom="zoomLevel" />
                </template>
            </div>

            <div v-if="lesson?.additionalNotes" class="bg-gray-50 p-4 rounded">
                <h3 class="text-lg font-semibold mb-2">Additional Notes</h3>
                <p>{{ lesson.additionalNotes }}</p>
            </div>
        </section>

        <div class="flex items-center justify-between bg-gray-100 p-4 rounded shadow">
            <button class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded" @click="navigateToLesson(-1)"
                :disabled="!previousLessonId">
                Previous Lesson
            </button>

            <div class="flex items-center">
                <label class="flex items-center space-x-2">
                    <input type="checkbox" v-model="isComplete" class="rounded" @change="markAsComplete" />
                    <span>Mark as Complete</span>
                </label>
            </div>

            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" @click="navigateToLesson(1)"
                :disabled="!nextLessonId">
                Next Lesson
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pdfFile from '@/assets/sample.pdf';

interface Lesson {
    id: number;
    title: string;
    type: 'video' | 'pdf';
    content: string;
    additionalNotes?: string;
}

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        const lesson = ref<Lesson | null>(null);
        const pdfSrc = ref<string | null>(null);
        const isComplete = ref(false);
        const previousLessonId = ref<number | null>(null);
        const nextLessonId = ref<number | null>(null);
        const zoomLevel = ref(1);

        const fetchLesson = async (courseId: number, lessonId: number) => {
            const mockLessons: Lesson[] = [
                {
                    id: 1,
                    title: 'Introduction to Vue.js',
                    type: 'video',
                    content: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                },
                {
                    id: 2,
                    title: 'Understanding Components',
                    type: 'pdf',
                    content: 'src/assets/sample.pdf',
                    additionalNotes: 'This lesson covers the basics of Vue components.',
                },
            ];
            const currentLesson = mockLessons.find((l) => l.id === lessonId);
            lesson.value = currentLesson || null;

            if (lesson.value?.type === 'pdf') {
                pdfSrc.value = pdfFile;
            }

            const currentIndex = mockLessons.findIndex((l) => l.id === lessonId);
            previousLessonId.value = currentIndex > 0 ? mockLessons[currentIndex - 1].id : null;
            nextLessonId.value =
                currentIndex < mockLessons.length - 1 ? mockLessons[currentIndex + 1].id : null;
        };

        const markAsComplete = () => {
            alert(isComplete.value ? 'Marked as complete!' : 'Marked as incomplete.');
        };

        const navigateToLesson = (direction: number) => {
            const nextId = direction === 1 ? nextLessonId.value : previousLessonId.value;
            if (nextId) {
                router.push(`/courses/${route.params.course_id}/lessons/${nextId}`);
                fetchLesson(Number(route.params.course_id), nextId);
            }
        };

        onMounted(() => {
            const courseId = Number(route.params.course_id);
            const lessonId = Number(route.params.lesson_id);
            fetchLesson(courseId, lessonId);
        });

        return { lesson, pdfSrc, zoomLevel, isComplete, previousLessonId, nextLessonId, navigateToLesson, markAsComplete };
    },
});
</script>

<style scoped>
.bg-white {
    background-color: white;
}
</style>