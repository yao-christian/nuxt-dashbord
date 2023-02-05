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

            <template v-else-if="column.key === 'value'">
                <Input placeholder="Nouvelle donnée" v-model:value="kpiDataValue[record.id!]" type="number" :max="99" />
            </template>

            <template v-else-if="column.key === 'actions'">
                <Button :is-disabled="!kpiDataValue[record.id!]" :is-loading="isAddKpiDataValueSubmitting[record.id!]"
                    type="link" @click="handleAddKpiData(record.id!)">Ajouter</Button>
            </template>
        </template>

        <template #emptyText>
            <p>Aucune donnée</p>
        </template>
    </Table>
</template>

<script lang="ts" setup>
import { Input, notification, Table } from 'ant-design-vue';
import daysjs from 'dayjs';
import { KpiData } from '~/types/kpi-data.type';
import { TableBody } from '../types';

defineProps<{ isLoading: boolean; kpisData: KpiData[]; }>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const columns: any = [
    { title: 'Indicateur', key: 'kpi', width: '400px' },
    { title: 'Entreprise', key: 'operator', width: '300px' },
    { title: 'Date', key: 'date', dataIndex: 'date', align: 'center' },
    { title: 'Valeur', key: 'value', align: 'center', width: '200px' },
    { title: 'Actions', key: 'actions', align: 'center' }
];

const kpiDataValue: Record<string, number> = reactive({});
const isAddKpiDataValueSubmitting: Record<string, boolean> = reactive({});

async function handleAddKpiData(id: number) {
    try {
        const value = kpiDataValue[id];
        isAddKpiDataValueSubmitting[id] = true;
        await addKpiData([{ id, value }]);
    } catch (error) {
        notification.error({ message: "Une erreur s'est produite lors de l'ajout, veuillez réessayer" })
    } finally {
        isAddKpiDataValueSubmitting[id] = false;
        emit('refresh');
    }
}
</script>