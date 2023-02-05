<template>
    <div class="card">
        <div class="card-body">
            <div class="icon-container">
                <img v-if="!isSuccess" src="~/assets/images/icons/error-icon.png" alt="error" />
                <img v-else src="~/assets/images/icons/success-icon.png" alt="success" />
            </div>

            <h4 class="d-flex justify-content-center mb-20 msg-title">{{ title }}</h4>

            <p class="d-flex justify-content-center msg">{{ message }}</p>

            <div>
                <slot></slot>
            </div>

            <div class="d-flex justify-content-center my-20">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    title: string,
    message: string,
    isSuccess: boolean;
}>();
</script>

<style scoped lang="scss">
.icon-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    img {
        width: 150px;
    }
}

.msg-title {
    font-size: 22px;
}

.msg {
    font-size: 16px;
}
</style>