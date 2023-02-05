<template>
    <Table :loading="isLoading" :columns="columns" :data-source="kpisData!" bordered>
        <template #bodyCell="{ column, record }: TableBody">
            <div v-if="column.key === 'kpi'">
                {{ record.kpi.title }}
            </div>

            <template v-else-if="column.key === 'operator'">
                {{ record.operator.corporateName }}
            </template>

            <template v-if="column.key === 'date'">
                {{ daysjs(record.date).format('DD/MM/YYYY') }}
            </template>
        </template>

        <template #emptyText>
            <p>Aucune donnée</p>
        </template>
    </Table>
</template>

<script lang="ts" setup>
import { Table } from 'ant-design-vue';
import daysjs from 'dayjs';
import { KpiData } from '~/types/kpi-data.type';
import { TableBody } from '../types';

defineProps<{ isLoading: boolean; kpisData: KpiData[]; }>();

const columns: any = [
    { title: 'Indicateur', key: 'kpi', width: '400px' },
    { title: 'Entreprise', key: 'operator', width: '300px' },
    { title: 'Date', key: 'date', dataIndex: 'date', align: 'center' },
    { title: 'Valeur', key: 'value', dataIndex: 'value' },
];

const isKpiDataValidationSubmitting: Record<string, boolean> = reactive({});
</script>