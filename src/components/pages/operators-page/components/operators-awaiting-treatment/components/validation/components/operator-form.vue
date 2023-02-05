<template>
    <Form class="register-operator-form" :ref="getFormRef" :model="formState" name="register-operator"
        autocomplete="off" layout="vertical">

        <Card hoverable class="mb-20">
            <div class="form-grid">
                <FormItem name="categoryId" label="Catalogue"
                    :rules="[{ required: true, message: `Veuillez sélectionner le catalogue` }]">
                    <Select :loading="isOperatorCategoryListLoading" v-model:value="formState.categoryId"
                        :options="operatorCategoryList?.map(item => ({ value: item.id, label: item.title }))"
                        placeholder="Catalogue" />
                </FormItem>
            </div>
        </Card>

        <Card title="Informations de l'entreprise" class="mb-20">
            <div class="form-grid">
                <FormItem label="Nom de l'entreprise" name="description"
                    :rules="[{ required: true, message: 'Veuillez renseigner le nom de votre entreprise!' }]">
                    <Input v-model:value="formState.description" />
                </FormItem>

                <FormItem label="Sigle de l'entreprise" name="corporateName">
                    <Input v-model:value="formState.corporateName" />
                </FormItem>

                <FormItem label="Date de création" name="companyCreatedAt"
                    :rules="[{ required: true, message: `Veuillez sélectionner la date de création` }]">
                    <DatePicker style="width: 100%;" placeholder="sélectionnez une date"
                        v-model:value="formState.companyCreatedAt" value-format="DD-MM-YYYY" format="DD-MM-YYYY"
                        :disabled-date="disabledDate" />
                </FormItem>

                <FormItem name="africaRegionId" label="Région de l'Afrique du siège social"
                    :rules="[{ required: true, message: `Veuillez renseigner la région de l'Afrique du siège social` }]">
                    <Select :loading="isAfricaRegionsLoading" v-model:value="formState.africaRegionId"
                        :options="africaRegions!" :field-names="fieldNamesSelect" />
                </FormItem>

                <FormItem label="Pays du siège social" name="countryId" :rules="[{
                    required: true, message: `Veuillez renseigner le pays du siège social`
                }]">
                    <Select :loading="isCountriesLoading" v-model:value="formState.countryId" :options="countries!"
                        :field-names="fieldNamesSelect" />
                </FormItem>

                <FormItem label="Ville du siège social" name="city" :rules="[{
                    required: true, message: `Veuillez renseigner le ville du siège social`
                }]">
                    <Input v-model:value="formState.city" />
                </FormItem>

                <FormItem name="organizationTypeId" label="Type dorganisation"
                    :rules="[{ required: true, message: `Veuillez sélectionner le type d'organisation` }]">
                    <Select :loading="isOrganizationsTypeLoading" v-model:value="formState.organizationTypeId"
                        :options="[{ id: '0', title: 'Autre' }, ...organizationsType!]"
                        :field-names="fieldNamesSelect" />
                </FormItem>

                <FormItem label="Chifre d'affaire" name="ca" :rules="[{
    required: true, message: `Veuillez
                renseigner le chiffre d'affaire!` }]">
                    <Input v-model:value="formState.ca" type="number" />
                </FormItem>

                <FormItem name="currencyId" label="Devise"
                    :rules="[{ required: true, message: 'Veuillez sélectionner une devise' }]">
                    <Select v-model:value="formState.currencyId"
                        :options="CURRENCIES.map(item => ({ value: item.id, label: item.label }))" />
                </FormItem>

                <FormItem label="Nombre d'employés hommes" name="numberOfMenEmployees" :rules="[{
    required: true, message: `Veuillez
                renseigner le nombre d'employés hommes` }]">
                    <Input v-model:value="formState.numberOfMenEmployees" type="number" />
                </FormItem>

                <FormItem label="Nombre d'employés femmes" name="numberOfWomenEmployees" :rules="[{
    required: true, message: `Veuillez
                renseigner le nombre d'employés femmes` }]">
                    <Input v-model:value="formState.numberOfWomenEmployees" type="number" />
                </FormItem>

                <FormItem label="Email" name="email"
                    :rules="[{ required: true, message: 'Veuillez renseigner l\'email!' }]">
                    <Input v-model:value="formState.email" />
                </FormItem>

                <FormItem label="Numéro téléphone" name="phone"
                    :rules="[{ required: true, message: 'Veuillez le numéro téléphone!' }]">
                    <Input v-model:value="formState.phone" />
                </FormItem>

                <FormItem label="Site internet" name="website">
                    <Input type="url" v-model:value="formState.website" />
                </FormItem>

                <FormItem label="Adresse" name="address">
                    <Input v-model:value="formState.address" />
                </FormItem>

                <FormItem name="isMember" label="Etes-vous membre AAE ?"
                    :rules="[{ required: true, message: 'Veuillez sélectionner une réponse' }]">
                    <Select @on-change="formState.matricule = ''" v-model:value="formState.isMember"
                        :options="[{ value: 1, label: 'Oui' }, { value: 0, label: 'Non' }]" />
                </FormItem>

                <FormItem v-show="formState.isMember" label="Code matricule" name="matricule" :rules="[{
    required: formState.isMember === 1, message: `Veuillez
                renseigner code matricule` }]">
                    <Input v-model:value="formState.matricule" />
                </FormItem>
            </div>
        </Card>

        <Card title="Informations de la personne en charge" class="mb-20">
            <div class="form-grid">
                <FormItem label="Nom de l'opérateur" name="firstname"
                    :rules="[{ required: true, message: 'Veuillez votre nom!' }]">
                    <Input v-model:value="formState.firstname" />
                </FormItem>

                <FormItem label="Prénom de l'opérateur" name="lastname"
                    :rules="[{ required: true, message: 'Veuillez renseigner votre prénom!' }]">
                    <Input v-model:value="formState.lastname" />
                </FormItem>

                <FormItem name="gender" label="Genre"
                    :rules="[{ required: true, message: 'Veuillez sélectionner un genre' }]">
                    <Select v-model:value="formState.gender"
                        :options="GENDERS.map(item => ({ value: item.label, label: item.label }))" />
                </FormItem>

                <FormItem label="Fonction" name="function"
                    :rules="[{ required: true, message: 'Veuillez renseigner votre prénom!' }]">
                    <Input v-model:value="formState.function" />
                </FormItem>
            </div>
        </Card>
    </Form>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { type FormInstance, FormItem, Input, Form, Select, Card, DatePicker } from 'ant-design-vue';
import type { Operator, OperatorForm } from '~/types/operator.type';

const props = defineProps<{ operator: Operator }>();

const emit = defineEmits<{
    (e: 'getFormRef', form: FormInstance | undefined): void;
}>();

const fieldNamesSelect = { label: 'title', value: 'id' };

const formState = reactive<OperatorForm>({
    ...props.operator,
    organizationTypeId: props.operator.organizationType?.id!,
    currencyId: props.operator.currency?.id!,
    countryId: props.operator.country?.id,
    africaRegionId: props.operator.africaRegion?.id
});

const africaRegionIdRef = toRef(formState, 'africaRegionId');

const { operatorCategoryList, isLoading: isOperatorCategoryListLoading } = await useOperatorCategoryList();
const { organizationsType: apiOrganizationsType, isLoading: isOrganizationsTypeLoading } = await useOrganizationsType();
const { africaRegions, isLoading: isAfricaRegionsLoading } = await useAfricaRegions();
const { countries, isLoading: isCountriesLoading } = await useAfricaRegionCountries({ africaRegionId: africaRegionIdRef });

const organizationsType = computed(() => {
    return [...apiOrganizationsType.value!, { id: '0', title: 'Autre' }];
});

const formRef = ref<FormInstance>();

function getFormRef(form: any) {
    formRef.value = form;
}

function disabledDate(current: Dayjs) {
    return current && current > dayjs().endOf('day');
}

onMounted(() => {
    emit('getFormRef', formRef.value);
});
</script>

<style lang="scss" scoped>
.form-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
</style>