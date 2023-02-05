<template>
    <div class="d-flex align-items-center justify-content-center login-layout">
        <div class="login-layout-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-layout {
    min-height: 100vh;

    &-content {
        width: 50%;
    }
}
</style>