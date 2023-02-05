<template>
    <Drawer title="Validation abonné" :is-open="open" @close="$emit('close')">

        <Spin v-if="isLoading" />

        <div v-else>
            <StepSubscriberForm v-if="selectedStep == 'step-subscriber-form'" @get-form-ref="getFormRef" />
            <StepSelectPackage v-else-if="selectedStep == 'step-select-pack'" />
            <StepRecap v-else-if="selectedStep == 'step-recap'" />
        </div>

        <template #footer>
            <Button danger class="mr-10" @click="goToPreviousStep">
                {{ isOnTheFirstStep? 'Fermer': 'Retour' }}
            </Button>

            <Button type="primary" @click="goToNextStep" :loading="isSubmitting">
                {{ isOnTheLasstStep? 'Valider': 'Suivant' }}
            </Button>
        </template>
    </Drawer>
</template>

<script lang="ts" setup>
import { FormInstance, Modal, Spin } from 'ant-design-vue';
import StepSubscriberForm from './components/step-subscriber-form.vue';
import StepSelectPackage from './components/step-select-package.vue';
import StepRecap from './components/step-recap.vue';
import * as subscriptionService from '~/services/subscription.service';
import { useRegisterSubscriber } from './state';
import { Subscriber } from '~/types/subscriber.type';
import { InitSubscriptionValidationRequest } from '~/types/request/init-subscription-validation-request.type';

type StepType = 'step-subscriber-form' | 'step-select-pack' | 'step-recap';

const props = defineProps<{ open: boolean, subscriber: Subscriber }>();
const emit = defineEmits<{ (e: 'close', kpi: undefined, canRefresh: boolean): void; }>();

const { subscriberSubscriptionsResponse, isLoading } = await useUsersBaskets({ userCode: props.subscriber.code, status: 0 });

const registerSubscriber = useRegisterSubscriber();

watch(() => subscriberSubscriptionsResponse.value, () => {
    registerSubscriber.value.subscriberForm = subscriberSubscriptionsResponse.value?.subscriberForm!;
    registerSubscriber.value.pack = subscriberSubscriptionsResponse.value?.subscriptions[0].pack!;
});

const formRef = ref<FormInstance>();
const getFormRef = (form: FormInstance | undefined) => {
    formRef.value = form;
}

const steps: StepType[] = [
    'step-subscriber-form',
    'step-select-pack',
    'step-recap'
];

const selectedStep = ref<StepType>(steps[0]);

const currentStepIndex = computed(() => {
    const currentStepIndex = steps.findIndex(step => step == selectedStep.value);
    return currentStepIndex
});

const isOnTheFirstStep = computed(() => currentStepIndex.value == 0);
const isOnTheLasstStep = computed(() => currentStepIndex.value == steps.length - 1);

const isSubmitting = ref(false);

async function onSubmit() {
    try {
        isSubmitting.value = true;

        const initSubscriptionValidationRequest: InitSubscriptionValidationRequest = {
            ...registerSubscriber.value.subscriberForm!,
            userCode: subscriberSubscriptionsResponse.value?.subscriber.code!,
            basketId: subscriberSubscriptionsResponse.value?.subscriptions[0]?.basketId!,
            packId: registerSubscriber.value.pack?.id!
        }

        await subscriptionService.validateInitSubscription(initSubscriptionValidationRequest);

        Modal.success({
            centered: true,
            title: 'Opération réussie',
            content: h('div', {}, [
                h('p', 'Votre opération a été éffectuée avec succès.'),
                h('p', 'Veuillez consulter votre email pour valider votre souscription.'),
            ]),
        });

        registerSubscriber.value.subscriberForm = null;
        registerSubscriber.value.pack = null;

        emit('close', undefined, true);
    } catch (error) {
    } finally {
        isSubmitting.value = false;
    }
}

async function goToNextStep() {
    if (isOnTheLasstStep.value) {
        await onSubmit();
    } else {
        // Si le step n'existe pas ou si nous sommes sur la derniere etape, on va sur le step 1
        if ((currentStepIndex.value === -1) || currentStepIndex.value === (steps.length - 1)) {
            selectedStep.value = steps[0];
        } else {
            if (steps[currentStepIndex.value] === 'step-subscriber-form') {
                const fieldsValue = formRef.value?.getFieldsValue();
                registerSubscriber.value.subscriberForm = fieldsValue as any;
                await formRef.value?.validateFields();
            }
            selectedStep.value = steps[currentStepIndex.value + 1];
        }
    }
}

function goToPreviousStep() {
    const isOnTheFirstStep = currentStepIndex.value === -1 || currentStepIndex.value === 0;

    if (isOnTheFirstStep) {
        emit('close', undefined, false);
    } else {
        selectedStep.value = steps[currentStepIndex.value - 1];
    }
}
</script>
