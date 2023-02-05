<template>
    <div class="step-recap">
        <Card class="mb-20" title="Information personnelle">
            <div class="info-container mb-20">
                <p class="info-label">Nom</p>
                <h5 class="info-content">{{ subscriber?.firstname }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Prénoms</p>
                <h5 class="info-content">{{ subscriber?.lastname }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Email</p>
                <h5 class="info-content">{{ subscriber?.email }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Addresse</p>
                <h5 class="info-content">{{ subscriber?.address }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Age</p>
                <h5 class="info-content">{{ age?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Fonction</p>
                <h5 class="info-content">{{ subscriber?.function }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Genre</p>
                <h5 class="info-content">{{ subscriber?.gender }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Téléphone</p>
                <h5 class="info-content">{{ subscriber?.phone }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Est membre ?</p>
                <h5 class="info-content">{{ subscriber?.isMember === 1 ? 'Oui' : 'Non' }}
                </h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Matricule</p>
                <h5 class="info-content">{{ subscriber?.matricule }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Organisation</p>
                <h5 class="info-content">{{ subscriber?.organization }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Type d'organisation</p>
                <h5 class="info-content">{{ organizationType?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Autre type d'organisation</p>
                <h5 class="info-content">{{ subscriber?.otherOrganizationType }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Pays de fonction</p>
                <h5 class="info-content">{{ country?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Région (Continent)</p>
                <h5 class="info-content">{{ continent?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Type membre AAE</p>
                <h5 class="info-content">{{ memberType?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Nationalité</p>
                <h5 class="info-content">{{ nationality?.title }}</h5>
            </div>
        </Card>

        <Card title="Package selectionné">
            <div class="info-container">
                <p class="info-label">Nom</p>
                <h5 class="info-content">{{ pack?.title }}</h5>
            </div>

            <div class="info-container">
                <p class="info-label">Montant</p>
                <h5 class="info-content">{{ $formatAmount(pack?.amount!) }}</h5>
            </div>

            <ul class="mb-20 p-20 bg-color-gray-200">
                <h2 class="mb-20">Avantages</h2>
                <li class="mb-10" v-for="advantage in pack?.advantages">
                    <div class="d-flex align-items-center">
                        <CheckCircleFilled class="color-success" />
                        <span class="ml-10 fs-13">{{ advantage.description }}</span>
                    </div>
                </li>
            </ul>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { Card } from 'ant-design-vue';
import { Age, Continent, Country, MemberType, Nationality, OrganizationType } from '~/types/base.type';
import { useRegisterSubscriber } from '../state';

const registerSubscriber = useRegisterSubscriber();

const pack = registerSubscriber.value.pack;
const subscriber = registerSubscriber.value.subscriberForm;


const { ages } = await useAges();
const { organizationsType } = await useOrganizationsType();
const { countries } = await useCountries();
const { continents } = await useContinents();
const { nationalities } = await useNationalities();
const { membersType } = await useMembersType();

const organizationType = ref<OrganizationType>();
const country = ref<Country>();
const continent = ref<Continent>();
const nationality = ref<Nationality>();
const memberType = ref<MemberType>();
const age = ref<Age>();

watch(organizationsType, () => {
    organizationType.value = organizationsType.value?.find(organizationType => organizationType.id == registerSubscriber.value.subscriberForm?.organizationTypeId)
});

watch(countries, () => {
    country.value = countries.value?.find(country => country.id == registerSubscriber.value.subscriberForm?.functionCountryId)
});

watch(continents, () => {
    continent.value = continents.value?.find(continent => continent.id == registerSubscriber.value.subscriberForm?.continentId)
});

watch(nationalities, () => {
    nationality.value = nationalities.value?.find(nationality => nationality.id == registerSubscriber.value.subscriberForm?.nationalityId)
});

watch(membersType, () => {
    memberType.value = membersType.value?.find(memberType => memberType.id == registerSubscriber.value.subscriberForm?.memberTypeId)
});

watch(ages, () => {
    age.value = ages.value?.find(age => age.id == registerSubscriber.value.subscriberForm?.memberTypeId)
});
</script>