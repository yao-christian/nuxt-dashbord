<template>
    <Card title="Liste des abonnés">
        <template #extra>
            <Space>
                <InputSearch placeholder="Recherche..." />
                <RangePicker :placeholder="['Date début', 'Date fin']" />
                <Button type="primary">Recherche</Button>
            </Space>
        </template>

        <Tabs v-model:active-key="status">
            <TabPane :key="SUBSCRIBERS_STATUS.AWAITING_TREATMENT.value"
                :tab="SUBSCRIBERS_STATUS.AWAITING_TREATMENT.title">
                <SubscribersAwaitingTreatment :isLoading="isLoading" :subscribersResponse="subscribersResponse!"
                    @handle-change-pagination="handleChangePagination" :pageSize="pageSize" :currentPage="currentPage"
                    @refresh="refresh" />
            </TabPane>
            <TabPane :key="SUBSCRIBERS_STATUS.VALIDATED.value" :tab="SUBSCRIBERS_STATUS.VALIDATED.title">
                <ValidatedSubscribers :isLoading="isLoading" :subscribersResponse="subscribersResponse!"
                    @handle-change-pagination="handleChangePagination" :pageSize="pageSize"
                    :currentPage="currentPage" />
            </TabPane>
            <TabPane :key="SUBSCRIBERS_STATUS.REJECTED.value" :tab="SUBSCRIBERS_STATUS.REJECTED.title">
                <RejectedSubscribers :isLoading="isLoading" :subscribersResponse="subscribersResponse!"
                    @handle-change-pagination="handleChangePagination" :pageSize="pageSize"
                    :currentPage="currentPage" />
            </TabPane>
        </Tabs>
    </Card>
</template>

<script lang="ts" setup>
import { Card, Space, InputSearch, RangePicker, Tabs, TabPane } from 'ant-design-vue';
import SubscribersAwaitingTreatment from './components/subscribers-awaiting-treatment/index.vue';
import ValidatedSubscribers from './components/validated-subscribers.vue';
import RejectedSubscribers from './components/rejected-subscribers.vue';

const status = ref(SUBSCRIBERS_STATUS.AWAITING_TREATMENT.value);
const pageSize = ref(10);
const currentPage = ref(1);

const page = computed(() => currentPage.value - 1);
const { subscribersResponse, isLoading, refresh } = await useSubscribers({ status: status, page: page, size: pageSize });

watch([pageSize, currentPage, status], () => {
    refresh();
});

function handleChangePagination(page: number, currentPageSize: number) {
    pageSize.value = currentPageSize;
    currentPage.value = page;
}
</script>
