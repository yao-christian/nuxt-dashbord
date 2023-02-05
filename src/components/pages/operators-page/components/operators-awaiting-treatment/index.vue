<template>
    <Table :pagination="false" :loading="isLoading" :columns="TABLE_COLUMNS" :data-source="operatorsResponse.operators"
        bordered>

        <template #bodyCell="{ column, record }">
            <DisplayOfColumn v-if="['isMember', 'matricule'].includes(column.key)" :column-key="column.key"
                :operator="record" />

            <template v-if="column.key === 'actions'">
                <Space>
                    <Button type="primary" @click="toogleValidation(record)">Valider</Button>
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

    <Validation v-if="openValidation" :operator="currentOperator!" :open="openValidation" @close="toogleValidation" />
    <OperatorDetails v-if="openDetails" :operator="currentOperator!" :open="openDetails" @close="toogleDetails" />
</template>

<script lang="ts" setup>
import { Table, Space, Button, Pagination } from 'ant-design-vue';
import Validation from './components/validation/index.vue';
import OperatorDetails from '../operator-details.vue';
import { TABLE_COLUMNS } from '../../constants';
import { OperatorsResponse } from '~/types/response/operators-response.type';
import { Operator } from '~/types/operator.type';
import DisplayOfColumn from '../display-of-column.vue';

defineProps<{
    operatorsResponse: OperatorsResponse,
    currentPage: number,
    pageSize: number,
    isLoading: boolean
}>();

const emit = defineEmits<{
    (e: 'handleChangePagination', page: number, pageSize: number): void;
    (e: 'refresh'): void;
}>();

const currentOperator = ref<Operator>();

function onChangePagination(page: number, pageSize: number) {
    emit('handleChangePagination', page, pageSize);
}

const openValidation = ref(false);

function toogleValidation(operator?: Operator, canRefresh?: boolean) {
    openValidation.value = !openValidation.value;
    currentOperator.value = operator;

    if (canRefresh) {
        emit('refresh')
    }
}

const openDetails = ref(false);

function toogleDetails(operator?: Operator, canRefresh?: boolean) {
    openDetails.value = !openDetails.value;
    currentOperator.value = operator;

    if (canRefresh) {
        emit('refresh')
    }
}
</script>

<style>
th.column-money,
td.column-money {
    text-align: right !important;
}
</style>
