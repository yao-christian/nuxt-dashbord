<template>
    <Card title="Liste des indicateurs">
        <template #extra>
            <InputSearch placeholder="Recherche..." />
        </template>

        <Table :pagination="false" :loading="isLoading" :columns="columns" :data-source="kpisResponse?.kpis" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'measure'">
                    <span>{{ record.measure?.title }}</span>
                </template>

                <template v-if="column.key === 'periodicity'">
                    <span>{{ record.periodicity?.description }}</span>
                </template>

                <template v-if="column.key === 'actions'">
                    <div class="d-flex align-items-center">
                        <Button class="p-0" type="link" @click="toggleSetUpKpi(record)">Paramétrer</Button>
                    </div>
                </template>
            </template>

            <template #emptyText>
                <p>Aucun indicateur</p>
            </template>

            <template #footer>
                <div class="d-flex justify-content-end">
                    <Pagination @change="onChangePagination" :current="currentPage" :pageSize="pageSize"
                        show-size-changer :total="kpisResponse?.pagination?.total!" />
                </div>
            </template>
        </Table>

        <SetUpKpi v-if="openSetUpKpi" :kpi="currentKpi!" :open="openSetUpKpi" @close="toggleSetUpKpi" />
    </Card>
</template>

<script lang="ts" setup>
import { InputSearch, Table, Pagination } from 'ant-design-vue';
import { ColumnsType } from 'ant-design-vue/lib/table/Table';
import { Kpi } from '~/types/kpi.type';
import SetUpKpi from './components/set-up-kpi/index.vue';

const status = ref(OPERATORS_STATUS.AWAITING_TREATMENT.value);
const pageSize = ref(10);
const currentPage = ref(1);
const currentKpi = ref<Kpi>();

const openSetUpKpi = ref(false);

const columns: ColumnsType<{ key: string, name: string, money: string, address: string }> = [
    { title: 'Nom', key: 'title', dataIndex: 'title' },
    { title: 'Description', key: 'description', dataIndex: 'description' },
    { title: 'Mesure', key: 'measure', dataIndex: 'measure' },
    { title: 'Periodicité', key: 'periodicity', dataIndex: 'periodicity' },
    { title: 'Visibilité', key: 'visibility', dataIndex: 'visibility' },
    { title: "Actions", key: 'actions' }
];

const page = computed(() => currentPage.value - 1);

const { kpisResponse, isLoading, refresh } = await useKpis({ page: page, size: pageSize });

watch([pageSize, currentPage, status], () => {
    refresh();
});

function onChangePagination(page: number, currentPageSize: number) {
    pageSize.value = currentPageSize;
    currentPage.value = page;
}

function toggleSetUpKpi(kpi?: Kpi, canRefresh?: boolean) {
    openSetUpKpi.value = !openSetUpKpi.value;
    currentKpi.value = kpi;

    if (canRefresh) {
        refresh()
    }
}
</script>
