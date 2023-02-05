<template>
    <Form class="register-operator-form" :ref="getFormRef" :model="formState" name="register-operator"
        autocomplete="off" layout="vertical">
        <Card>
            <FormItem label="Nom de l'indicateur" name="title"
                :rules="[{ required: true, message: `Veuillez renseigner le nom de l'indicateur!` }]">
                <Textarea v-model:value="formState.title" />
            </FormItem>

            <FormItem name="description" label="Description de l'indicateur">
                <Textarea v-model:value="formState.description" />
            </FormItem>

            <div class="form-grid">
                <FormItem name="measureId" label="Mesure"
                    :rules="[{ required: true, message: 'Veuillez sélectionner une mesure' }]">
                    <Select :loading="isKpiMeasuresLoading" v-model:value="formState.measureId"
                        :options="kpiMeasures?.map(item => ({ value: item.id, label: item.title }))" />
                </FormItem>

                <FormItem name="periodicityId" label="Périodicité"
                    :rules="[{ required: true, message: 'Veuillez sélectionner une périodicité' }]">
                    <Select :loading="isKpiPeriodicitiesLoading" v-model:value="formState.periodicityId"
                        :options="kpiPeriodicities?.map(item => ({ value: item.title, label: item.description }))" />
                </FormItem>

                <FormItem name="visibility" label="Visibilité"
                    :rules="[{ required: true, message: 'Veuillez sélectionner une visibilité' }]">
                    <Select v-model:value="formState.visibility"
                        :options="KPI_VISIBILITIES.map(item => ({ value: item.id, label: item.title }))" />
                </FormItem>
            </div>
        </Card>
    </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import {
    type FormInstance,
    FormItem,
    Form,
    Select,
    Card,
    Textarea
} from 'ant-design-vue';

import { Kpi, KpiForm } from '~/types/kpi.type';

const props = defineProps<{ kpi: Kpi }>();

const emit = defineEmits<{
    (e: 'getFormRef', form: FormInstance | undefined): void;
}>();

const { kpiPeriodicities, isLoading: isKpiPeriodicitiesLoading } = await useKpiPeriodicities();
const { kpiMeasures, isLoading: isKpiMeasuresLoading } = await useKpiMeasures();

const formRef = ref<FormInstance>();

function getFormRef(form: any) {
    formRef.value = form;
}

onMounted(() => {
    emit('getFormRef', formRef.value);
});

const formState = reactive<Partial<KpiForm>>({
    title: props.kpi?.title,
    description: props.kpi?.description!,
    periodicityId: props.kpi?.periodicity.id!,
    measureId: props.kpi?.measure.id!,
    visibility: props.kpi?.visibility
});
</script>

<style lang="scss" scoped>
.form-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
</style>