<template>
    <AButton @click="$emit('click', $event)" :type="type" :loading="isLoading" :danger="danger" :ghost="ghost"
        :disabled="disabled || isDisabled" :shape="shape" :block="block" :href="href">
        <slot></slot>

        <template #icon>
            <slot name="icon"></slot>
        </template>
    </AButton>
</template>

<script lang="ts" setup>
import { Button as AButton } from 'ant-design-vue';

interface Props {
    type: "primary" | "link" | "text" | "dashed" | "default";
    isLoading?: boolean | { delay: number };
    danger: boolean;
    ghost: boolean;
    disabled: boolean;
    isDisabled: boolean;
    shape: "circle" | "round" | "default";
    size: "large" | "middle" | "small";
    block: boolean;
    href?: string;
    target?: string;
}

withDefaults(defineProps<Props>(), {
    type: "default",
    isLoading: false,
    danger: false,
    ghost: false,
    disabled: false,
    isDisabled: false,
    shape: 'default',
    block: false,
    size: "middle"
});

defineEmits<{
    (e: 'click', event: Event): void;
}>();

</script>
