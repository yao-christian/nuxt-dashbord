<template>
    <Table :columns="columns" :data-source="registredKpiDataList" :loading="loading" bordered>
        <template #emptyText>
            <p>Aucune donnée</p>
        </template>
    </Table>
</template>

<script lang="ts" setup>
import { Table } from 'ant-design-vue';
import { KpiData } from '~/types/kpi-data.type';

defineProps<{
    registredKpiDataList: KpiData[];
    loading: boolean
}>();

const columns = [
    {
        title: 'Date',
        key: 'date',
        dataIndex: 'date',
    },
    {
        title: 'Valeur',
        key: 'value',
        dataIndex: 'value',
    }
];
</script>
