<template>
    <ACard :title="title" :bordered="true" :loading="isLoading">
        <slot></slot>

        <template #title>
            <slot name="title"></slot>
        </template>

        <template #cover>
            <slot name="cover"></slot>
        </template>

        <template #extra>
            <slot name="extra"></slot>
        </template>

        <template #actions>
            <slot name="actions"></slot>
        </template>
    </ACard>
</template>

<script lang="ts" setup>
import { Card as ACard } from 'ant-design-vue';

interface Props {
    title?: string;
    hoverable?: boolean;
    isLoading?: boolean;
}

withDefaults(defineProps<Props>(), {});
</script>
