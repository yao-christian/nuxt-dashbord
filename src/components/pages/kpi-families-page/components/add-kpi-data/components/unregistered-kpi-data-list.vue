<template>
    <Card title="Liste des données à enregistrer">
        <Table :columns="columns" :data-source="unregistredKpiDataList" bordered>
            <template #emptyText>
                <p>Aucune donnée</p>
            </template>
        </Table>

        <div v-if="unregistredKpiDataList?.length! > 0" class="mt-10 d-flex justify-content-end">
            <Button type="primary" @click="onSubmit">Valider</Button>
        </div>
    </Card>
</template>

<script setup lang="ts">
import {
    Card,
    Button,
    Table,
} from 'ant-design-vue';

import { Kpi as KpiModel } from '~/types/kpi.type';
import { KpiData } from '~/types/kpi-data.type';
import * as kpiDataService from '~/services/kpi-data.service';

const props = defineProps<{ kpi: KpiModel, unregistredKpiDataList: KpiData[] }>();
const emit = defineEmits<{ (e: 'refresh'): void }>();

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

async function onSubmit() {
    await kpiDataService.addData(props.kpi?.id!, props.unregistredKpiDataList);
    emit('refresh');
}
</script>