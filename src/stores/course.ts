import { defineStore } from 'pinia';

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [] as Array<{ id: number; name: string; description: string }>,
  }),
  actions: {
    addCourse(course: { id: number; name: string; description: string }) {
      this.courses.push(course);
    },
  },
});
