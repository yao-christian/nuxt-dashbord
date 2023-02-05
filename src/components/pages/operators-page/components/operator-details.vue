<template>
    <Drawer title="Détail de l'opérateur" :is-open="open">
        <Card hoverable title="Informations de l'entreprise" class="mb-20">
            <div class="info-container mb-20">
                <p class="info-label">Nom de l'entreprise</p>
                <h5 class="info-content">{{ operator.description }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Sigle de l'entreprise</p>
                <h5 class="info-content">{{ operator.corporateName }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Email</p>
                <h5 class="info-content">{{ operator.email }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Téléphone</p>
                <h5 class="info-content">{{ operator.phone }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Site internet</p>
                <h5 class="info-content">{{ operator.website }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Addresse</p>
                <h5 class="info-content">{{ operator.address }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Est membre ?</p>
                <h5 class="info-content">{{ operator.isMember === 1 ? 'Oui' : 'Non' }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Matricule</p>
                <h5 class="info-content">{{ operator.matricule }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Type d'organisation</p>
                <h5 class="info-content">{{ operator.organizationType?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Autre type d'organisation</p>
                <h5 class="info-content">{{ operator.otherOrganizationType }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Date de création</p>
                <h5 class="info-content">{{ operator.companyCreatedAt }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Pays du siège social</p>
                <h5 class="info-content">{{ operator.country?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Région de l'Afrique du siège social</p>
                <h5 class="info-content">{{ operator.africaRegion?.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Ville du siège social</p>
                <h5 class="info-content">{{ operator.cityOfheadOffice }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Chiffre d'affaire</p>
                <h5 class="info-content">{{ operator.ca }} {{ operator.currency.title }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Nombre total d'emplyés</p>
                <h5 class="info-content">{{ operator.totalNumberOfStaff }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Nombre total d'emplyés hommes</p>
                <h5 class="info-content">{{ operator.numberOfMenEmployees }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Nombre total d'emplyés femmes</p>
                <h5 class="info-content">{{ operator.numberOfWomenEmployees }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Categorie</p>
                <h5 class="info-content">{{ operator.category?.title }}</h5>
            </div>
        </Card>

        <Card hoverable title="Informations personnelles" class="mb-20">
            <h3 class="mb-20">Informations de l'entreprise</h3>

            <div class="info-container mb-20">
                <p class="info-label">Nom</p>
                <h5 class="info-content">{{ operator.firstname }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Prénoms</p>
                <h5 class="info-content">{{ operator.lastname }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Genre</p>
                <h5 class="info-content">{{ operator.gender }}</h5>
            </div>

            <div class="info-container mb-20">
                <p class="info-label">Fonction</p>
                <h5 class="info-content">{{ operator.function }}</h5>
            </div>
        </Card>

        <template #footer>
            <Button danger class="mr-10" @click="emit('close')">Fermer</Button>
        </template>
    </Drawer>
</template>

<script lang="ts" setup>
import { Operator } from '~/types/operator.type';

defineProps<{ open: boolean; operator: Operator; }>();
const emit = defineEmits<{ (e: 'close'): void; }>();
</script>
