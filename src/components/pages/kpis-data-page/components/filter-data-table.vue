<template>
    <Card>
        <Form class="register-operator-form" ref="formRef" :model="formState" name="register-operator"
            autocomplete="off" layout="vertical">
            <div class="form-grid">
                <FormItem name="operatorId" label="Entreprise">
                    <Select showSearch @change="$emit('handleChangeOperator', $event)" :loading="isOperatorsLoading"
                        v-model:value="formState.operatorId"
                        :options="operators?.map(item => ({ value: item.id, label: item.corporateName }))">
                        <template #notFoundContent>
                            Aucune donnée
                        </template>
                    </Select>
                </FormItem>

                <FormItem name="kpiFamilyId" label="Famille d'indicateur">
                    <Select showSearch @change="$emit('handleChangeKpiFamily', $event)"
                        :loading="isKpiFamilyListLoading" v-model:value="formState.kpiFamilyId"
                        :options="kpiFamilyList?.map(item => ({ value: item.id, label: item.title }))">
                        <template #notFoundContent>
                            Aucune donnée
                        </template>
                    </Select>
                </FormItem>

                <FormItem name="kpiId" label="Indicateur">
                    <Select showSearch @change="$emit('handleChangeKpi', $event)" :loading="isKpisLoading"
                        v-model:value="formState.kpiId"
                        :options="kpis?.map(item => ({ value: item.id, label: item.title }))">
                        <template #notFoundContent>
                            Aucune donnée
                        </template>
                    </Select>
                </FormItem>

                <FormItem name="dataType" label="Quelles données voulez-vous récupérer?">
                    <Select showSearch @change="$emit('handleChangeDataType', $event)" :loading="isKpisLoading"
                        v-model:value="formState.dataType" :options="DATA_TYPES">
                        <template #notFoundContent>
                            Aucune donnée
                        </template>
                    </Select>
                    <span class="color-error fs-13">Les données ne sont mofiables qu'avant un délai de 3
                        mois (*)</span>
                </FormItem>
            </div>
        </Form>

        <div class="d-flex justify-content-end">
            <Button type="primary" @click="refresh">
                Réinitialiser
            </Button>
        </div>
    </Card>
</template>

<script setup lang="ts">
import { type FormInstance, FormItem, Form, Select } from 'ant-design-vue';
import { FormState } from '../types';

const emit = defineEmits<{
    (e: 'handleChangeOperator', dataType: number): void;
    (e: 'handleChangeKpiFamily', dataType: number): void;
    (e: 'handleChangeKpi', dataType: number): void;
    (e: 'handleChangeDataType', dataType: number): void;
}>();

const DATA_TYPES = [
    { value: 1, label: 'Les données à renseigner' },
    { value: 2, label: 'Les données modifiables' },
    { value: 3, label: 'Les données en attente de validation' },
    { value: 4, label: 'Les données validées' },
];

const formRef = ref<FormInstance>();
const formState = reactive<FormState>({ dataType: 1 });

const { kpiFamilyList, isLoading: isKpiFamilyListLoading } = await useKpiFamilyList();
const { operators, isLoading: isOperatorsLoading } = await useAllOperators();
const { kpis, isLoading: isKpisLoading } = await useAllKpis();

function refresh() {
    formRef.value?.resetFields();
    emit('handleChangeOperator', 0);
    emit('handleChangeKpiFamily', 0);
    emit('handleChangeKpi', 0);
    emit('handleChangeDataType', 0);
}
</script>
