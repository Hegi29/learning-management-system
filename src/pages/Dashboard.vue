<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <header class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Course List</h1>
            <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow" @click="addCourse">
                Add Course
            </button>
        </header>

        <div class="overflow-x-auto bg-white shadow rounded-lg">
            <table class="w-full text-left table-auto border-collapse">
                <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="p-4 border-b">Nama Kursus</th>
                        <th class="p-4 border-b">Jumlah Siswa Terdaftar</th>
                        <th class="p-4 border-b">Status</th>
                        <th class="p-4 border-b text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(course, index) in courses" :key="index" class="border-t hover:bg-gray-50">
                        <td class="p-4">{{ course.name }}</td>
                        <td class="p-4">{{ course.enrolledStudents }}</td>
                        <td class="p-4">
                            <span class="px-2 py-1 rounded-full text-sm" :class="{
                                'bg-green-100 text-green-600': course.status === 'Aktif',
                                'bg-red-100 text-red-600': course.status === 'Nonaktif'
                            }">
                                {{ course.status }}
                            </span>
                        </td>
                        <td class="p-4 text-center">
                            <button class="text-blue-600 hover:underline mr-4" @click="editCourse(index)">
                                Edit
                            </button>
                            <button class="text-red-600 hover:underline" @click="deleteCourse(index)">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter();

        const courses = reactive([
            { name: "Vue.js Basics", enrolledStudents: 25, status: "Aktif" },
            { name: "Advanced Tailwind CSS", enrolledStudents: 18, status: "Nonaktif" },
            { name: "TypeScript Essentials", enrolledStudents: 30, status: "Aktif" },
        ]);

        const addCourse = () => {
            router.push("/admin/course/new");
        };

        const editCourse = (index: number) => {
            router.push("/admin/course/edit");
        };

        const deleteCourse = (index: number) => {
            if (confirm(`Are you sure you want to delete "${courses[index].name}"?`)) {
                courses.splice(index, 1);
                alert("Course deleted!");
            }
        };

        return {
            courses,
            addCourse,
            editCourse,
            deleteCourse,
        };
    },
});
</script>

<style scoped>
th,
td {
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}
</style>