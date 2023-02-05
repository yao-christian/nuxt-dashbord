<template>
    <Drawer title="Détails abonné" :is-open="open" @close="$emit('close')">
        <Card class="mb-10">
            <h3 class="mb-20">Information du client client</h3>

            <div class="info-container mb-20">
                <p class="info-label">Nom</p>
                <h5 class="info-content">{{ subscriber.firstname }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Prénoms</p>
                <h5 class="info-content">{{ subscriber.lastname }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Email</p>
                <h5 class="info-content">{{ subscriber.email }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Addresse</p>
                <h5 class="info-content">{{ subscriber.address }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Age</p>
                <h5 class="info-content">{{ subscriber.age?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Fonction</p>
                <h5 class="info-content">{{ subscriber.function }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Genre</p>
                <h5 class="info-content">{{ subscriber.gender }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Téléphone</p>
                <h5 class="info-content">{{ subscriber.phone }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Est membre ?</p>
                <h5 class="info-content">{{ subscriber.isMember === 1 ? 'Oui' : 'Non' }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Matricule</p>
                <h5 class="info-content">{{ subscriber.matricule }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Organisation</p>
                <h5 class="info-content">{{ subscriber.organization }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Type d'organisation</p>
                <h5 class="info-content">{{ subscriber.organizationType?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Autre type d'organisation</p>
                <h5 class="info-content">{{ subscriber.otherOrganizationType }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Pays de fonction</p>
                <h5 class="info-content">{{ subscriber.functionCountry?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Région (Continent)</p>
                <h5 class="info-content">{{ subscriber.continent?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Type membre AAE</p>
                <h5 class="info-content">{{ subscriber.memberType?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Nationalité</p>
                <h5 class="info-content">{{ subscriber.nationality?.title }}</h5>
            </div>
        </Card>

        <Spin v-if="isLoading" />

        <Card v-else title="Package selectionné">
            <div class="info-container">
                <p class="info-label">Nom</p>
                <h5 class="info-content">{{ subscriberPack?.title }}</h5>
            </div>

            <div class="info-container">
                <p class="info-label">Montant</p>
                <h5 class="info-content">{{ $formatAmount(subscriberPack?.amount!) }}</h5>
            </div>

            <ul class="mb-20 p-20 bg-color-gray-200">
                <h2 class="mb-20">Avantages</h2>
                <li class="mb-10" v-for="advantage in subscriberPack?.advantages">
                    <div class="d-flex align-items-center">
                        <CheckCircleFilled class="color-success" />
                        <span class="ml-10 fs-13">{{ advantage.description }}</span>
                    </div>
                </li>
            </ul>
        </Card>

        <template #footer>
            <Button danger class="mr-10" @click="$emit('close')">Fermer</Button>
        </template>
    </Drawer>
</template>

<script lang="ts" setup>
import { Spin } from 'ant-design-vue';
import { Subscriber } from '~/types/subscriber.type';
import { Pack } from '~/types/pack.type';

const props = defineProps<{ open: boolean; subscriber: Subscriber; }>();
defineEmits<{ (e: 'close'): void; }>();

const { subscriberSubscriptionsResponse, isLoading } = await useUsersBaskets({
    userCode: props.subscriber.code,
    status: props.subscriber.status.value - 1
});

const subscriberPack = ref<Pack>();

watch(() => subscriberSubscriptionsResponse.value, () => {
    subscriberPack.value = subscriberSubscriptionsResponse.value?.subscriptions[0].pack!;
});
</script>
