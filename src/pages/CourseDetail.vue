<template>
    <div class="p-6">
        <section class="mb-8 bg-white p-6 rounded shadow">
            <h1 class="text-2xl font-bold mb-4">{{ course?.name }}</h1>
            <p class="mb-4 text-gray-700">{{ course?.description }}</p>
            <p class="mb-2">
                <strong>Instructor:</strong> {{ course?.instructor }}
            </p>
            <div class="mb-4">
                <strong>Progress:</strong>
                <span>{{ userProgress }}%</span>
            </div>
        </section>

        <section class="bg-white p-6 rounded shadow">
            <h2 class="text-xl font-bold mb-4">Lessons</h2>
            <ul>
                <li v-for="lesson in course?.lessons" :key="lesson.id"
                    class="flex items-center justify-between mb-4 p-4 border rounded">
                    <div>
                        <p class="text-lg font-semibold">{{ lesson.name }}</p>
                        <p :class="{
                            'text-green-600': lesson.status === 'Completed',
                            'text-yellow-600': lesson.status === 'In Progress',
                        }">
                            Status: {{ lesson.status }}
                        </p>
                    </div>
                    <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        @click="startLesson(lesson.id)">
                        Start Lesson
                    </button>
                </li>
            </ul>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Lesson {
    id: number;
    name: string;
    status: 'Completed' | 'In Progress';
}

interface Course {
    id: number;
    name: string;
    description: string;
    instructor: string;
    lessons: Lesson[];
}

export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();

        const course = ref<Course | null>(null);
        const userProgress = ref<number>(0);

        const fetchCourse = async (id: number) => {
            const mockCourse: Course = {
                id,
                name: 'Vue.js Mastery',
                description: 'Learn the fundamentals and advanced concepts of Vue.js.',
                instructor: 'Jane Doe',
                lessons: [
                    { id: 1, name: 'Introduction to Vue.js', status: 'Completed' },
                    { id: 2, name: 'Vue Components', status: 'In Progress' },
                    { id: 3, name: 'State Management with Vuex', status: 'In Progress' },
                ],
            };
            course.value = mockCourse;
            calculateProgress(mockCourse.lessons);
        };

        const calculateProgress = (lessons: Lesson[]) => {
            const total = lessons.length;
            const completed = lessons.filter((lesson) => lesson.status === 'Completed')
                .length;
            userProgress.value = Math.round((completed / total) * 100);
        };

        const startLesson = (lessonId: number) => {
            router.push(`/courses/1/lessons/1`);
        };

        onMounted(() => {
            const courseId = Number(route.params.id);
            fetchCourse(courseId);
        });

        return { course, userProgress, startLesson };
    },
});
</script>

<style scoped>
.bg-white {
    background-color: white;
}
</style>