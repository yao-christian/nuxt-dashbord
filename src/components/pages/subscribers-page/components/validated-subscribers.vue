<template>
    <Table :pagination="false" :loading="isLoading" :columns="columns" :data-source="subscribersResponse.subscribers"
        bordered>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'actions'">
                <Space>
                    <Button @click="toogleDetails(record)">Détails</Button>
                </Space>
            </template>
        </template>

        <template #emptyText>
            <Empty description="  Aucun abonnés en attente" />
        </template>

        <template #footer>
            <div class="d-flex justify-content-end">
                <Pagination @change="onChangePagination" :current="currentPage" :pageSize="pageSize" show-size-changer
                    :total="subscribersResponse.pagination?.total" />
            </div>
        </template>
    </Table>

    <SubscriberDetails v-if="openDetails" :open="openDetails" :subscriber="currentSubscriber!" @close="toogleDetails" />
</template>

<script lang="ts" setup>
import { Table, Space, Empty, Pagination } from 'ant-design-vue';
import { ColumnsType } from 'ant-design-vue/lib/table';
import SubscriberDetails from './subscriber-details.vue';
import { SubscribersResponse } from '~/types/response/subscribers-response.type';
import { Subscriber } from '~/types/subscriber.type';

defineProps<{
    subscribersResponse: SubscribersResponse,
    currentPage: number,
    pageSize: number,
    isLoading: boolean
}>();

const emit = defineEmits<{
    (e: 'handleChangePagination', page: number, pageSize: number): void;
}>();

const currentSubscriber = ref<Subscriber>();
const openDetails = ref(false);
const columns: ColumnsType<{ key: string, name: string, money: string, address: string }> = [
    {
        title: 'Nom',
        key: 'firstname',
        dataIndex: 'firstname',
    },
    {
        title: 'Prénoms',
        key: 'lastname',
        dataIndex: 'lastname',
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
    },
    {
        title: 'Fonction',
        key: 'function',
        dataIndex: 'function',
    },
    {
        title: 'Age',
        key: 'age',
        dataIndex: 'age',
    },
    {
        title: "Actions",
        key: 'actions',
    }
];

function onChangePagination(page: number, pageSize: number) {
    emit('handleChangePagination', page, pageSize);
}

function toogleDetails(subscriber?: Subscriber) {
    openDetails.value = !openDetails.value;
    currentSubscriber.value = subscriber;
}
</script>

<style>
th.column-money,
td.column-money {
    text-align: right !important;
}
</style>
