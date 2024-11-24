<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <header class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">
                {{ isEditMode ? "Edit Course" : "Add Course" }}
            </h1>
        </header>

        <form class="bg-white shadow-md rounded-lg p-6" @submit.prevent="saveCourse">
            <div class="mb-4">
                <label for="courseName" class="block text-gray-700 font-bold mb-2">
                    Course Name:
                </label>
                <input id="courseName" v-model="course.name" type="text" required
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div class="mb-4">
                <label for="description" class="block text-gray-700 font-bold mb-2">
                    Description:
                </label>
                <textarea id="description" v-model="course.description" rows="4"
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>

            <div class="mb-4">
                <label for="category" class="block text-gray-700 font-bold mb-2">
                    Category:
                </label>
                <select id="category" v-model="course.category"
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option disabled value="">Select a category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                </select>
            </div>

            <div class="mb-4">
                <label for="startDate" class="block text-gray-700 font-bold mb-2">
                    Start Date:
                </label>
                <input id="startDate" v-model="course.startDate" type="date"
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div class="mb-4">
                <label for="endDate" class="block text-gray-700 font-bold mb-2">
                    End Date:
                </label>
                <input id="endDate" v-model="course.endDate" type="date"
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div class="mb-4">
                <label for="price" class="block text-gray-700 font-bold mb-2">
                    Price:
                </label>
                <input id="price" v-model.number="course.price" type="number"
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div class="mb-6">
                <label for="courseImage" class="block text-gray-700 font-bold mb-2">
                    Course Image:
                </label>
                <input id="courseImage" type="file" @change="handleFileUpload"
                    class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div class="text-right">
                <button type="submit" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow mr-2">
                    Cancel
                </button>
                <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow">
                    Save
                </button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    props: {
        courseId: {
            type: Number,
            default: null,
        },
    },
    setup(props) {
        const router = useRouter();

        interface Course {
            name: string;
            description: string;
            category: string;
            startDate: string;
            endDate: string;
            price: number;
            image: File | null;
        }

        const initialCourse: Course = {
            name: "",
            description: "",
            category: "",
            startDate: "",
            endDate: "",
            price: 0,
            image: null,
        };

        const course = reactive({ ...initialCourse });

        const isEditMode = ref(true);

        const handleFileUpload = (event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target?.files?.[0]) {
                course.image = target.files[0];
            }
        };

        const saveCourse = () => {
            if (isEditMode.value) {
                console.log("Updating course:", course);
                alert("Course updated successfully!");
            } else {
                console.log("Adding new course:", course);
                alert("Course added successfully!");
            }

            router.push("/dashboard");
        };

        return {
            course,
            isEditMode,
            handleFileUpload,
            saveCourse,
        };
    },
});
</script>