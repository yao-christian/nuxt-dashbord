<template>
    <Card class="mb-20">
        <Form class="register-operator-form" ref="formRef" :model="formState" name="register-operator"
            autocomplete="off" layout="vertical">
            <div class="form-grid">
                <FormItem name="operatorId" label="Opérateur"
                    :rules="[{ required: true, message: `Veuillez sélectionner un opérateur` }]">
                    <Select :loading="isOperatorsLoading" v-model:value="formState.operatorId"
                        :options="operators?.map(item => ({ value: item.id, label: item.corporateName }))" />
                </FormItem>

                <FormItem name="kpiDataId" label="Date"
                    :rules="[{ required: true, message: `Veuillez sélectionner une date` }]">
                    <Select :loading="isUnregistredKpiDataLoading" v-model:value="formState.kpiDataId"
                        :options="unregistredKpiDataList?.map(item => ({ value: item.id, label: item.date }))">
                        <template #notFoundContent>
                            Aucune donnée
                        </template>
                    </Select>
                </FormItem>

                <FormItem name="kpiDataValue" label="Valeur"
                    :rules="[{ required: true, message: `Veuillez ajouter une donnée` }]">
                    <InputNumber class="width-100-percent" v-model:value="formState.kpiDataValue" />
                </FormItem>
            </div>

            <div class="d-flex justify-content-end">
                <Button type="primary" @click="onSubmit">Ajouter</Button>
            </div>
        </Form>
    </Card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import {
    type FormInstance,
    FormItem,
    Form,
    Select,
    Card,
    InputNumber,
    Button,
} from 'ant-design-vue';

import { Kpi as KpiModel } from '~/types/kpi.type';
import { KpiData } from '~/types/kpi-data.type';

const props = defineProps<{ kpi: KpiModel }>();

const emit = defineEmits<{
    (e: 'handleUnregistredKpiDataList', unregistredKpiDataList: KpiData): void
}>();

const { operators, isLoading: isOperatorsLoading } = await useAllOperators();
const { kpisData: unregistredKpiDataList, isLoading: isUnregistredKpiDataLoading } = await useKpisData({ kpiId: ref(props.kpi?.id!) });

const formRef = ref<FormInstance>();

interface FormState {
    operatorId: string;
    kpiDataId: string;
    kpiDataValue?: number
}

const formState = reactive<FormState>({
    operatorId: '',
    kpiDataId: '',
});

async function onSubmit() {
    await formRef.value?.validateFields();

    const newUnregistredKpiDataList = unregistredKpiDataList.value?.find(item => item.id == +formState.kpiDataId);

    if (newUnregistredKpiDataList) {
        newUnregistredKpiDataList.value = formState.kpiDataValue!;
        emit('handleUnregistredKpiDataList', newUnregistredKpiDataList);
    }
}
</script>