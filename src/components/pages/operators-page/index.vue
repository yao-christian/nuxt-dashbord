<template>
    <Card title="Liste des opérateurs">
        <template #extra>
            <Space>
                <InputSearch placeholder="Recherche..." />
                <RangePicker :placeholder="['Date début', 'Date fin']" />
                <Button type="primary">Recherche</Button>
            </Space>
        </template>

        <Tabs v-model:active-key="status">
            <TabPane :key="OPERATORS_STATUS.AWAITING_TREATMENT.value" tab="En attente de traitement">
                <AwaitingTreatmentOperators :isLoading="isLoading" :operatorsResponse="OperatorsResponse!"
                    @handle-change-pagination="handleChangePagination" :pageSize="pageSize" :currentPage="currentPage"
                    @refresh="refresh" />
            </TabPane>
            <TabPane :key="OPERATORS_STATUS.VALIDATED.value" tab="Validés">
                <ValidatedOperators :isLoading="isLoading" :operatorsResponse="OperatorsResponse!"
                    @handle-change-pagination="handleChangePagination" :pageSize="pageSize"
                    :currentPage="currentPage" />
            </TabPane>
            <TabPane :key="OPERATORS_STATUS.REJECTED.value" tab="Rejetés">
                <RejectedOperators :isLoading="isLoading" :operatorsResponse="OperatorsResponse!"
                    @handle-change-pagination="handleChangePagination" :pageSize="pageSize"
                    :currentPage="currentPage" />
            </TabPane>
        </Tabs>
    </Card>
</template>

<script lang="ts" setup>
import { Card, Space, InputSearch, RangePicker, Button, Tabs, TabPane } from 'ant-design-vue';
import AwaitingTreatmentOperators from './components/operators-awaiting-treatment/index.vue';
import ValidatedOperators from './components/validated-operators.vue';
import RejectedOperators from './components/rejected-operators.vue';

const status = ref(OPERATORS_STATUS.AWAITING_TREATMENT.value);
const pageSize = ref(10);
const currentPage = ref(1);

const page = computed(() => currentPage.value - 1);
const { OperatorsResponse, isLoading, refresh } = await useOperators({ status: status, page: page, size: pageSize });

watch([pageSize, currentPage, status], () => {
    refresh();
});

function handleChangePagination(page: number, currentPageSize: number) {
    pageSize.value = currentPageSize;
    currentPage.value = page;
}
</script>
