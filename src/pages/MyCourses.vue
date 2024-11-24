<template>
    <div class="p-6 min-h-screen">
        <h1 class="text-2xl font-bold mb-6">My Courses</h1>

        <div v-if="enrolledCourses.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="course in enrolledCourses" :key="course.id"
                class="bg-white shadow-md rounded-md overflow-hidden">
                <div class="p-4">
                    <h2 class="text-lg font-bold mb-2">{{ course.name }}</h2>
                    <p class="text-gray-600 mb-2">Status: {{ course.status }}</p>
                    <div class="relative w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div class="absolute bg-blue-600 h-4 rounded-full" :style="{ width: course.progress + '%' }">
                        </div>
                    </div>
                    <p class="text-gray-600 mb-4">{{ course.progress }}% completed</p>
                    <button @click="continueCourse(course.id)"
                        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                        Continue
                    </button>
                </div>
            </div>
        </div>

        <div v-else class="text-center text-gray-600">
            <p>You are not enrolled in any courses yet.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter();

        const enrolledCourses = ref([
            {
                id: 1,
                name: "JavaScript Basics",
                status: "In Progress",
                progress: 50,
            },
            {
                id: 2,
                name: "Advanced Vue.js",
                status: "Completed",
                progress: 100,
            },
            {
                id: 3,
                name: "Design Fundamentals",
                status: "In Progress",
                progress: 30,
            },
        ]);

        const continueCourse = (courseId: number) => {
            router.push(`/courses/${courseId}/lessons/1`);
        };

        return {
            enrolledCourses,
            continueCourse,
        };
    },
});
</script>
