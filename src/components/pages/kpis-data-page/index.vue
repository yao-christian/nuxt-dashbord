<template>
    <Card title="Liste des données">
        <FilterDataTable class="mb-20" @handleChangeOperator="handleChangeOperator"
            @handleChangeDataType="handleChangeDataType" @handleChangeKpiFamily="handleChangeKpiFamily"
            @handleChangeKpi="handleChangeKpi" />

        <AddDataTable v-if="view === 'Add-data'" :is-loading="isKpisDataLoading" :kpis-data="kpisData!"
            @refresh="refresh" />

        <UpdateDataTable v-else-if="view === 'update-data'" :is-loading="isKpisDataLoading" :kpis-data="kpisData!"
            @refresh="refresh" />

        <ValidateDataTable v-else-if="view === 'validate-data'" :is-loading="isKpisDataLoading" :kpis-data="kpisData!"
            @refresh="refresh" />

        <ValidatedDataTable v-else-if="view === 'validated-data'" :is-loading="isKpisDataLoading"
            :kpis-data="kpisData!" />
    </Card>
</template>

<script lang="ts" setup>
import FilterDataTable from './components/filter-data-table.vue';
import AddDataTable from './components/add-data-table.vue';
import UpdateDataTable from './components/update-data-table.vue';
import ValidateDataTable from './components/validate-data-table.vue';
import ValidatedDataTable from './components/validated-data-table.vue';

const selectedKpiId = ref(0);
const selectedKpiFamilyId = ref(0);
const selectedOperatorId = ref(0);
const hasData = ref(false);
const canBeUpdated = ref(false);
const status = ref(0);

const view = ref<"Add-data" | "update-data" | "validate-data" | "validated-data">('Add-data');

const { kpisData, isLoading: isKpisDataLoading, refresh } = await useKpisData({
    kpiFamilyId: selectedKpiFamilyId,
    operatorId: selectedOperatorId,
    kpiId: selectedKpiId,
    hasData: hasData,
    status: status,
    canBeUpdated: canBeUpdated
});

// Gestion du type de données à récuperer
function handleChangeDataType(dataType: number) {
    switch (dataType) {
        // Les données à renseigner
        case 1:
            hasData.value = false;
            status.value = 0;
            canBeUpdated.value = false;
            view.value = "Add-data";
            break;
        case 2:
            // Les données à valider
            hasData.value = true;
            status.value = 0;
            view.value = "update-data";
            break;
        case 3:
            // Les données à modifier
            hasData.value = true;
            canBeUpdated.value = true;
            view.value = "validate-data";
            break;
        case 4:
            // Les données à validées
            hasData.value = true;
            status.value = 1;
            view.value = "validated-data";
            break;
    }
}

function handleChangeOperator(operatorId: number) {
    selectedOperatorId.value = operatorId;
}

function handleChangeKpiFamily(kpiFamilyId: number) {
    selectedKpiFamilyId.value = kpiFamilyId;
}

function handleChangeKpi(kpiId: number) {
    selectedKpiId.value = kpiId;
}
</script>