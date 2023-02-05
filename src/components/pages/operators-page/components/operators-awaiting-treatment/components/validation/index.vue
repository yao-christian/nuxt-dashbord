<template>
    <Drawer title="Validation opérateur" :is-open="open" :footer-style="{ textAlign: 'right' }" :closable="false">

        <div>
            <OperatorForm @get-form-ref="getFormRef" :operator="operator" />
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
import { Button, FormInstance, Modal } from 'ant-design-vue';
import OperatorForm from './components/operator-form.vue';
import * as operatorService from '~/services/operator.service';
import { Operator, OperatorForm as OperatorFormModel } from '~/types/operator.type';
import { OperatorValidationRequest } from '~/types/request/operator-validation-request.type';

const props = defineProps<{ open: boolean, operator: Operator }>();
const emit = defineEmits<{ (e: 'close', kpi: undefined, canRefresh: boolean): void; }>();

const formRef = ref<FormInstance>();
const getFormRef = (form: FormInstance | undefined) => {
    formRef.value = form;
}

const isSubmitting = ref(false);

async function onSubmit() {
    try {
        await formRef.value?.validateFields();
        const values = formRef.value?.getFieldsValue() as OperatorFormModel;

        isSubmitting.value = true;

        const operatorValidationRequest: OperatorValidationRequest = {
            ...values,
            userCode: props.operator?.code!,
            operatorId: props.operator?.id!,
        }

        await operatorService.validateOperator(operatorValidationRequest);

        Modal.success({
            centered: true,
            title: 'Opération réussie',
            content: h('div', {}, [
                h('p', 'Votre opération a été éffectuée avec succès.'),
                h('p', 'Veuillez consulter votre email pour valider votre souscription.'),
            ]),
        });

        emit('close', undefined, true);
    } catch (error) {
    } finally {
        isSubmitting.value = false;
    }
}
</script>
