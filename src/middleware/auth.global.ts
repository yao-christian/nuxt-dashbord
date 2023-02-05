export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (to.name !== 'login' && !authStore.isAuthenticated) {
        return navigateTo('/login')
    }
});
