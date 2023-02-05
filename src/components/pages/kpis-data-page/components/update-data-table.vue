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

            <template v-else-if="column.key === 'new-value'">
                <Input placeholder="Nouvelle donnée" v-model:value="newKpiDataValue[record.id!]" type="number"
                    :max="99" />
            </template>

            <template v-else-if="column.key === 'actions'">
                <Button :is-disabled="!newKpiDataValue[record.id!]"
                    :is-loading="isEditKpiDataValueSubmitting[record.id!]" type="link"
                    @click="handleEditKpiData(record.id!)">Mofifier</Button>
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
    { title: 'Valeur', key: 'value', dataIndex: 'value' },
    { title: 'Nouvelle valeur', key: 'new-value', align: 'center', width: '200px' },
    { title: 'Actions', key: 'actions', align: 'center' }
];

const newKpiDataValue: Record<string, number> = reactive({});
const isEditKpiDataValueSubmitting: Record<string, boolean> = reactive({});

async function handleEditKpiData(id: number) {
    try {
        const value = newKpiDataValue[id];
        isEditKpiDataValueSubmitting[id] = true;
        await updateKpiData(id, value);
    } catch (error) {
        notification.error({ message: "Une erreur s'est produite lors de l'ajout, veuillez réessayer" })
    } finally {
        isEditKpiDataValueSubmitting[id] = false;
        emit('refresh');
    }
}
</script>