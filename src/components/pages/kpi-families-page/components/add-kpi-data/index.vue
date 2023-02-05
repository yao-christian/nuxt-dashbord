<template>
    <Drawer title="Editer un indicateur" :is-open="open" @close="$emit('close')">

        <div>
            <KpiDataForm class="mb-20" :kpi="kpi" :unregistredKpiDataList="unregistredKpiDataList"
                @handleUnregistredKpiDataList="handleUnregistredKpiDataList" />

            <UnregisteredKpiDataList class="mb-20" :kpi="kpi" :unregistredKpiDataList="unregistredKpiDataList"
                @refresh="refresh" />

            <kpiDataRegistredList :registredKpiDataList="registredKpiDataList!"
                :loading="isRegistredKpiDataListLoading" />
        </div>

        <template #footer>
            <Button danger class="mr-10" @click="$emit('close')">
                Fermer
            </Button>
        </template>
    </Drawer>
</template>

<script lang="ts" setup>
import { KpiData } from '~/types/kpi-data.type';
import { Kpi } from '~/types/kpi.type';
import KpiDataForm from './components/kpi-data-form.vue';
import UnregisteredKpiDataList from './components/unregistered-kpi-data-list.vue';
import kpiDataRegistredList from './components/registred-kpi-data-list.vue';
import { Button, Drawer } from 'ant-design-vue';

const props = defineProps<{ open: boolean, kpi: Kpi }>();
defineEmits<{ (e: 'close'): void; }>();

const { kpisData: registredKpiDataList, isLoading: isRegistredKpiDataListLoading, refresh: refreshRegistredKpiDataList } = await useKpisData({ kpiId: ref(props.kpi?.id!) });

const unregistredKpiDataList = ref<KpiData[]>([]);

function handleUnregistredKpiDataList(newKpiDataToBeRegistred: KpiData) {
    unregistredKpiDataList.value?.unshift(newKpiDataToBeRegistred);
}

function refresh() {
    refreshRegistredKpiDataList();
    unregistredKpiDataList.value = [];
}
</script>
