<template>
    <ADrawer :width="700" :title="title" :body-style="{ backgroundColor: '#eff2f7' }" :visible="isOpen"
        :footer-style="{ textAlign: 'right' }" :closable="false" @close="$emit('close')">

        <slot></slot>

        <template #footer>
            <slot name="footer"></slot>
        </template>
    </ADrawer>
</template>

<script lang="ts" setup>
import { Drawer as ADrawer } from 'ant-design-vue';

defineProps<{ isOpen: boolean; title: string; }>();
defineEmits<{ (e: 'close'): void; }>();
</script>
