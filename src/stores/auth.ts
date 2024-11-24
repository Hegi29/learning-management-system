import { defineStore } from 'pinia';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    mockUsers: [
      {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin',
        role: 'admin',
      },
      {
        id: 2,
        email: 'student@example.com',
        name: 'John',
        role: 'student',
      },
    ],
  }),
  actions: {
    login(email: string, password: string): { status: boolean; user?: User } {
      const user = this.mockUsers.find((u) => u.email === email);
      if (!user || password !== 'password123') {
        return { status: true, user };
      }

      this.user = user;
      this.token = 'mockToken123';
      return { status: true, user };
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
  persist: true,
});
