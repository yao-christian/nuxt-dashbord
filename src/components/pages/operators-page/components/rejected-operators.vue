<template>
    <Table :pagination="false" :loading="isLoading" :columns="TABLE_COLUMNS" :data-source="operatorsResponse.operators"
        bordered :scroll="{ y: 300 }">

        <template #bodyCell="{ column, record }">
            <DisplayOfColumn v-if="['isMember', 'matricule'].includes(column.key)" :column-key="column.key"
                :operator="record" />

            <template v-if="column.key === 'actions'">
                <Space>
                    <Button @click="toogleDetails(record)">Détails</Button>
                </Space>
            </template>
        </template>

        <template #emptyText>
            <p>Aucun abonnés en attente</p>
        </template>

        <template #footer>
            <div class="d-flex justify-content-end">
                <Pagination @change="onChangePagination" :current="currentPage" :pageSize="pageSize" show-size-changer
                    :total="operatorsResponse.pagination?.total" />
            </div>
        </template>
    </Table>

    <OperatorDetails v-if="openDetails" :operator="currentOperator!" :open="openDetails" @close="toogleDetails" />
</template>

<script lang="ts" setup>
import { Table, Space, Button, Pagination } from 'ant-design-vue';
import OperatorDetails from './operator-details.vue';
import { OperatorsResponse } from '~/types/response/operators-response.type';
import { Operator } from '~/types/operator.type';
import { TABLE_COLUMNS } from '../constants';
import DisplayOfColumn from './display-of-column.vue';

defineProps<{
    operatorsResponse: OperatorsResponse,
    currentPage: number,
    pageSize: number,
    isLoading: boolean
}>();

const emit = defineEmits<{
    (e: 'handleChangePagination', page: number, pageSize: number): void;
}>();

const currentOperator = ref<Operator>();

function onChangePagination(page: number, pageSize: number) {
    emit('handleChangePagination', page, pageSize);
}

const openDetails = ref(false);

function toogleDetails(operator?: Operator) {
    openDetails.value = !openDetails.value;
    currentOperator.value = operator;
}
</script>

<style>
th.column-money,
td.column-money {
    text-align: right !important;
}
</style>
