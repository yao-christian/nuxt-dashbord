<template>
    <Form class="register-operator-form" :ref="getFormRef" :model="formState" name="register-operator"
        autocomplete="off" layout="vertical">
        <Card>
            <div class="form-grid">
                <FormItem name="kpiFamilyIds" label="Familles d'indicateur"
                    :rules="[{ required: true, message: `Veuillez sélectionner les famille d'indicateur` }]">
                    <Select :loading="isKpiFamilyListLoading" mode="multiple" v-model:value="formState.kpiFamilyIds"
                        :options="kpiFamilyList?.map(item => ({ value: item.id, label: item.title }))" />
                </FormItem>

                <FormItem name="operatorCategoryIds" label="Categories des opérateurs"
                    :rules="[{ required: true, message: `Veuillez sélectionner les categories des opérateurs` }]">
                    <Select :loading="isOperatorCategoriesLoading" mode="multiple"
                        v-model:value="formState.operatorCategoryIds"
                        :options="operatorCategories?.map(item => ({ value: item.id, label: item.title }))" />
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
} from 'ant-design-vue';

import { Kpi, KpiForm } from '~/types/kpi.type';

const props = defineProps<{ kpi: Kpi }>();

const emit = defineEmits<{
    (e: 'getFormRef', form: FormInstance | undefined): void;
}>();

const { kpiFamilyList, isLoading: isKpiFamilyListLoading } = await useKpiFamilyList();
const { operatorCategories, isLoading: isOperatorCategoriesLoading } = await useOperatorCategories();

const formRef = ref<FormInstance>();

function getFormRef(form: any) {
    formRef.value = form;
}

onMounted(() => {
    emit('getFormRef', formRef.value);
});

const formState = reactive<Partial<KpiForm>>({
    kpiFamilyIds: props.kpi?.kpiFamilies?.map(item => item.id!),
    operatorCategoryIds: props.kpi?.operatorCategories?.map(item => item.id!),
});
</script>

<style lang="scss" scoped>
.form-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
</style>