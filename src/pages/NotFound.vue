<template>
    <div class="not-found">
        <div class="container">
            <h1 class="text-4xl font-bold text-red-600">404</h1>
            <p class="text-xl">Oops! The page you're looking for does not exist.</p>
            <router-link to="/" class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded">
                Go to Homepage
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
}
</script>

<style scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7fafc;
}

.container {
    text-align: center;
    padding: 20px;
}

h1 {
    font-size: 5rem;
    font-weight: bold;
}

p {
    font-size: 1.25rem;
    margin-top: 20px;
}

a {
    margin-top: 30px;
    display: inline-block;
    padding: 12px 20px;
    background-color: #3182ce;
    color: white;
    border-radius: 6px;
    text-decoration: none;
}

a:hover {
    background-color: #2b6cb0;
}
</style>