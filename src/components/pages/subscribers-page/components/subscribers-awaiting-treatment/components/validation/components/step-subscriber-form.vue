<template>
    <Form class="register-operator-form" :ref="getFormRef" :model="formState" name="register-operator"
        autocomplete="off" layout="vertical">

        <div class="card">
            <div class="card-header">
                <h4 class="header-title">Informations personnelles</h4>
            </div>

            <div class="card-body">
                <div class="form-grid">
                    <FormItem label="Nom" name="firstname"
                        :rules="[{ required: true, message: 'Veuillez votre nom!' }]">
                        <Input v-model:value="formState.firstname" />
                    </FormItem>

                    <FormItem label="Prénom" name="lastname"
                        :rules="[{ required: true, message: 'Veuillez renseigner votre prénom!' }]">
                        <Input v-model:value="formState.lastname" />
                    </FormItem>

                    <FormItem name="gender" label="Genre"
                        :rules="[{ required: true, message: 'Veuillez sélectionner un genre' }]">
                        <Select v-model:value="formState.gender"
                            :options="GENDERS.map(item => ({ value: item.label, label: item.label }))" />
                    </FormItem>

                    <FormItem name="ageId" label="Age"
                        :rules="[{ required: true, message: 'Veuillez sélectionner une intervalle' }]">
                        <Select :loading="isAgesLoading" v-model:value="formState.ageId"
                            :options="ages?.map(item => ({ value: item.id, label: item.title }))" />
                    </FormItem>

                    <FormItem label="Email" name="email"
                        :rules="[{ required: true, message: 'Veuillez renseigner l\'email!' }]">
                        <Input v-model:value="formState.email" />
                    </FormItem>

                    <FormItem label="Numéro téléphone" name="phone"
                        :rules="[{ required: true, message: 'Veuillez le numéro téléphone!' }]">
                        <Input v-model:value="formState.phone" />
                    </FormItem>

                    <FormItem label="Organisation" name="organization"
                        :rules="[{ required: true, message: 'Veuillez renseigner votre organisation' }]">
                        <Input v-model:value="formState.organization" />
                    </FormItem>

                    <FormItem label="Fonction" name="function">
                        <Input v-model:value="formState.function" />
                    </FormItem>

                    <FormItem name="organizationTypeId" label="Type d'organisation"
                        :rules="[{ required: true, message: `Veuillez sélectionner le type d'organisation` }]">
                        <Select :loading="isOrganizationsTypeLoading" @on-change="formState.otherOrganizationType = ''"
                            v-model:value="formState.organizationTypeId"
                            :options="organizationsType.map(item => ({ value: item.id, label: item.title }))" />
                    </FormItem>

                    <FormItem v-if="formState.organizationTypeId === '0'" label="Autre type d'organisation"
                        name="otherOrganizationType"
                        :rules="[{ required: true, message: 'Veuillez renseigner votre organisation' }]">
                        <Input v-model:value="formState.otherOrganizationType" />
                    </FormItem>

                    <FormItem name="functionCountryId" label="Pays de fonction"
                        :rules="[{ required: true, message: `Veuillez sélectionner le pays de fonction` }]">
                        <Select :loading="isCountriesLoading" @on-change="formState.otherOrganizationType = ''"
                            v-model:value="formState.functionCountryId"
                            :options="countries?.map(item => ({ value: item.id, label: item.title }))" />
                    </FormItem>

                    <FormItem name="continentId" label="Région (Continent)"
                        :rules="[{ required: true, message: `Veuillez sélectionner votre région (Continent)` }]">
                        <Select :loading="isContinentsLoading" v-model:value="formState.continentId"
                            :options="continents?.map(item => ({ value: item.id, label: item.title }))" />
                    </FormItem>

                    <FormItem name="nationalityId" label="Nationalité">
                        <Select :loading="isNationalitiesLoading" v-model:value="formState.nationalityId"
                            :options="nationalities?.map(item => ({ value: item.id, label: item.title }))" />
                    </FormItem>

                    <FormItem name="isMember" label="Etes-vous membre AAE ?"
                        :rules="[{ required: true, message: 'Veuillez sélectionner une réponse' }]">
                        <Select @on-change="formState.matricule = ''" v-model:value="formState.isMember"
                            :options="[{ value: 1, label: 'Oui' }, { value: 0, label: 'Non' }]" />
                    </FormItem>

                    <FormItem v-if="formState.isMember === 1" name="memberTypeId" label="Type membre AAE"
                        :rules="[{ required: true, message: 'Veuillez sélectionner le type membre AAE' }]">
                        <Select :loading="isMembersTypeLoading" v-model:value="formState.memberTypeId"
                            :options="membersType?.map(item => ({ value: item.id, label: item.title }))" />
                    </FormItem>

                    <FormItem v-if="formState.isMember === 1" label="Code matricule" name="matricule" :rules="[{
    required: formState.isMember === 1, message: `Veuillez
                    renseigner code matricule` }]">
                        <Input v-model:value="formState.matricule" />
                    </FormItem>

                    <FormItem label="Site internet" name="website">
                        <Input v-model:value="formState.website" />
                    </FormItem>

                    <FormItem label="Adresse" name="address">
                        <Input v-model:value="formState.address" />
                    </FormItem>
                </div>
            </div>
        </div>
    </Form>
</template>

<script setup lang="ts">
import {
    type FormInstance,
    FormItem,
    Input,
    Form,
    Select
} from 'ant-design-vue';
import { SubscriberForm } from '~/types/subscriber.type';
import { useRegisterSubscriber } from '../state';

const emit = defineEmits<{
    (e: 'getFormRef', form: FormInstance | undefined): void;
}>();

const { ages, isLoading: isAgesLoading } = await useAges();
const { organizationsType: apiOrganizationsType, isLoading: isOrganizationsTypeLoading } = await useOrganizationsType();
const { countries, isLoading: isCountriesLoading } = await useCountries();
const { continents, isLoading: isContinentsLoading } = await useContinents();
const { nationalities, isLoading: isNationalitiesLoading } = await useNationalities();
const { membersType, isLoading: isMembersTypeLoading } = await useMembersType();

const organizationsType = computed(() => {
    return [...apiOrganizationsType.value!, { id: '0', title: 'Autre' }];
});

const formRef = ref<FormInstance>();

function getFormRef(form: any) {
    formRef.value = form;
}

onMounted(() => {
    emit('getFormRef', formRef.value);
});

const registerSubscriber = useRegisterSubscriber();

const formState = reactive<SubscriberForm>({
    ...registerSubscriber.value?.subscriberForm!
});
</script>
    
<style lang="scss" scoped>
.card {
    background-color: rgb(251, 251, 251);
    border: 1px solid rgba(222, 222, 222, 0.5);
}
</style>