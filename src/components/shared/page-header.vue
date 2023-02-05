<template>
    <div class="page-header">
        <h3>{{ title }}</h3>
        <Breadcrumb separator=">">
            <BreadcrumbItem v-for="item of breadcrumbItems" :key="item.title">
                <NuxtLink :to="item.url">
                    {{ item.title }}
                </NuxtLink>
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
  
<script lang="ts" setup>
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue';
defineProps<{ title: string, breadcrumbItems: { title: string, url?: string }[] }>();
</script>

<style lang="scss" scoped>
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}
</style>
  