<template>
    <Card title="Liste des familles des indicateurs">
        <template #extra>
            <Space>
                <InputSearch placeholder="Recherche..." />
            </Space>
        </template>

        <Table :loading="isKpiFamilyListLoading" :columns="columns" :data-source="kpiFamilyList!" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'favoriteKpi'">
                    <div v-if="record.favoriteKpi" class="mb-10">
                        <Tag color="green">{{ record.favoriteKpi?.title }}</Tag>
                    </div>

                    <div v-else class="d-flex align-items-center">
                        <Select :default-value="record.favoriteKpi?.id" show-search class="mr-5"
                            :style="{ width: '300px' }" :disabled="isSubmitting[record.id]"
                            v-model:value="formState[record.id]"
                            :options="record.kpiList?.map((item: Kpi) => ({ value: item.id, label: item.title }))" />

                        <Button :disabled="!formState[record.id]" @click="handleUpdateKpiFavorite(record.id)"
                            type="primary" :loading="isSubmitting[record.id]">Valider</Button>
                    </div>
                </template>
            </template>

            <template #emptyText>
                <p>Aucune donnée</p>
            </template>
        </Table>
    </Card>
</template>

<script lang="ts" setup>
import { Card, Space, InputSearch, Table, Select, Button, Tag } from 'ant-design-vue';
import { Kpi } from '~/types/kpi.type';
import * as kpiFamilyService from '~/services/kpi-family.service';

const formState = reactive<Record<string, string>>({});
const isSubmitting = reactive<Record<string, boolean>>({});

const { kpiFamilyList, isLoading: isKpiFamilyListLoading, refresh } = await useKpiFamilyList();

async function handleUpdateKpiFavorite(kpiFamilyId: number) {
    const kpiId = formState[kpiFamilyId];
    isSubmitting[kpiFamilyId] = true;

    try {
        await kpiFamilyService.setUpFavoriteKpiOfKpiFamily({ kpiFamilyId, kpiId: +kpiId })
    } catch (error) {
        console.log(error);
    } finally {
        isSubmitting[kpiFamilyId] = false;
        refresh();
    }
}

const columns = [
    {
        title: 'Nom',
        key: 'title',
        dataIndex: 'title',
    },
    {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
    },
    {
        title: 'Indicateur favoris',
        key: 'favoriteKpi',
        dataIndex: 'favoriteKpi',
    },
];
</script>
