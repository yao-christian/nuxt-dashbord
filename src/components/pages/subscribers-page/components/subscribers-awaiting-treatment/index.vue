<template>
    <Table :pagination="false" :loading="isLoading" :columns="columns" :data-source="subscribersResponse.subscribers"
        bordered>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'actions'">
                <Space>
                    <Button type="primary" @click="toogleValidation(record)">Valider</Button>
                    <Button @click="toogleDetails(record)">Détails</Button>
                </Space>
            </template>
        </template>

        <template #emptyText>
            <p>Aucun abonnés en attente</p>
        </template>

        <template #footer>
            <div class="d-flex justify-content-end">
                <Pagination @change="onChangePagination" :current="currentPage" :pageSize="pageSize" show-size-changer
                    :total="subscribersResponse.pagination?.total" />
            </div>
        </template>
    </Table>

    <Validation v-if="openValidation" :subscriber="currentSubscriber!" :open="openValidation"
        @close="toogleValidation" />
    <SubscriberDetails v-if="openDetails" :subscriber="currentSubscriber!" :open="openDetails" @close="toogleDetails" />
</template>

<script lang="ts" setup>
import { Table, Space, Pagination } from 'ant-design-vue';
import { ColumnsType } from 'ant-design-vue/lib/table';
import Validation from './components/validation/index.vue';
import SubscriberDetails from '../subscriber-details.vue';
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
    (e: 'refresh'): void;
}>();

const currentSubscriber = ref<Subscriber>();
const openValidation = ref(false);
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

function toogleValidation(subscriber?: Subscriber, canRefresh?: boolean) {
    openValidation.value = !openValidation.value;
    currentSubscriber.value = subscriber;

    if (canRefresh) {
        emit('refresh')
    }
}

function toogleDetails(subscriber?: Subscriber, canRefresh?: boolean) {
    openDetails.value = !openDetails.value;
    currentSubscriber.value = subscriber;

    if (canRefresh) {
        emit('refresh')
    }
}
</script>

<style>
th.column-money,
td.column-money {
    text-align: right !important;
}
</style>
