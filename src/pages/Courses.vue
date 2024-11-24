<template>
    <div class="p-6 min-h-screen">
        <div class="flex items-center justify-between mb-6">
            <input v-model="searchQuery" type="text" placeholder="Search courses..."
                class="border border-gray-300 rounded-md px-4 py-2 w-1/2" />
            <select v-model="selectedCategory" class="border border-gray-300 rounded-md px-4 py-2">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
        </div>

        <div class="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="course in filteredCourses" :key="course.id"
                class="bg-white shadow-md rounded-md overflow-hidden">
                <img :src="course.image" alt="Course image" class="h-40 w-full object-cover" />
                <div class="p-4">
                    <h3 class="text-lg font-bold mb-2">{{ course.name }}</h3>
                    <p class="text-gray-600 mb-2">{{ course.description }}</p>
                    <p class="text-green-600 font-bold mb-4">${{ course.price }}</p>
                    <button @click="enroll(course.id)"
                        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                        Enroll
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    setup() {
        const router = useRouter();

        const courses = ref([
            {
                id: 1,
                name: "JavaScript Basics",
                description: "Learn the basics of JavaScript.",
                category: "Programming",
                price: 199000,
                image: "https://banner2.cleanpng.com/20180810/biz/3efdae17d419cdcf3886d344b989ea45.webp",
            },
            {
                id: 2,
                name: "Advanced Vue.js",
                description: "Deep dive into Vue.js features.",
                category: "Web Development",
                price: 199000,
                image: "https://w7.pngwing.com/pngs/492/902/png-transparent-vuejs-original-wordmark-logo-icon-thumbnail.png",
            },
            {
                id: 3,
                name: "Design Fundamentals",
                description: "Master the principles of design.",
                category: "Design",
                price: 149000,
                image: "https://www.sitecentre.com.au/uploads/2021/06/fundamentals-of-logo-design.jpg",
            },
        ]);

        const categories = ref(["Programming", "Web Development", "Design"]);

        const searchQuery = ref("");
        const selectedCategory = ref("");

        const filteredCourses = computed(() =>
            courses.value.filter((course) => {
                const matchesSearch =
                    course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                    course.category.toLowerCase().includes(searchQuery.value.toLowerCase());

                const matchesCategory =
                    !selectedCategory.value || course.category === selectedCategory.value;

                return matchesSearch && matchesCategory;
            })
        );

        const enroll = (courseId: number) => {
            router.push(`/courses/${courseId}`);
        };

        return {
            courses,
            categories,
            searchQuery,
            selectedCategory,
            filteredCourses,
            enroll,
        };
    },
});
</script>
