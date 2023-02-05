<template>
    <Drawer :width="700" title="Paramétrer un indicateur" :body-style="{ backgroundColor: '#eff2f7;' }" :visible="open"
        :footer-style="{ textAlign: 'right' }" :closable="false">

        <div>
            <KpiForm @get-form-ref="getFormRef" :kpi="kpi" />
        </div>

        <template #footer>
            <Button danger class="mr-10" @click="$emit('close')">
                Fermer
            </Button>

            <Button type="primary" @click="onSubmit" :loading="isSubmitting">
                Valider
            </Button>
        </template>
    </Drawer>
</template>

<script lang="ts" setup>
import { Button, Drawer, FormInstance, Modal } from 'ant-design-vue';
import KpiForm from './components/kpi-form.vue';
import { Kpi, KpiForm as KpiFormModel } from '~/types/kpi.type';
import * as kpiService from '~/services/kpi.service';

const props = defineProps<{ open: boolean, kpi: Kpi }>();
const emit = defineEmits<{ (e: 'close', kpi: undefined, canRefresh: boolean): void; }>();

const formRef = ref<FormInstance>();
const getFormRef = (form: FormInstance | undefined) => {
    formRef.value = form;
}

const isSubmitting = ref(false);

async function onSubmit() {
    await formRef.value?.validateFields();

    try {
        isSubmitting.value = true;

        const values = formRef.value?.getFieldsValue() as KpiFormModel;

        const data = { id: props.kpi?.id, ...values }
        await kpiService.setUpKpi(data);

        Modal.success({
            centered: true,
            title: 'Opération réussie',
            content: h('div', {}, [
                h('p', 'Votre opération a été éffectuée avec succès.'),
            ]),
        });

        emit('close', undefined, true);
    } catch (error) {
        console.log(error);
        Modal.error({
            centered: true,
            title: 'Echec opération',
            content: "L'opération' a éhoué, veuillez réessayer",
        });
    } finally {
        isSubmitting.value = false;
    }
}
</script>
