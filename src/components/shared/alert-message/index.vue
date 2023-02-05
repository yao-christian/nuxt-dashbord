<template>
    <a-modal :visible="visible" centered :closable="false">
        <div class="icon-container">
            <img v-if="!isSuccess" src="@/assets/images/icons/error-icon.png" alt="error" />
            <img v-else src="@/assets/images/icons/success-icon.png" alt="success" />
        </div>

        <h4 class="d-flex justify-content-center mb-20 msg-title">{{title}}</h4>

        <p class="d-flex justify-content-center msg">{{message}}</p>

        <div>
            <slot></slot>
        </div>

        <template #footer>
            <div class="d-flex justify-content-center my-10">
                <a-button class="btn-close" type="primary" danger @click="emit('close')">Fermer</a-button>
            </div>
        </template>
    </a-modal>
</template>

<script setup lang="ts">

import {
    Button as AButton,
    Modal as AModal,
} from 'ant-design-vue';

defineProps<{
    visible: boolean,
    title: string,
    message: string,
    isSuccess: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();
</script>

<style scoped lang="scss">
.btn-close {
    width: 100px;
    height: 35px;
    border-radius: 20px;
}

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