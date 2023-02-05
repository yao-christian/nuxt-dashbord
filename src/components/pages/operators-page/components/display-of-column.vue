<template>
    <template v-if="columnKey == 'isMember'">
        {{ operator.isMember ? 'Oui' : 'Non' }}
    </template>

    <div v-else-if="columnKey == 'matricule'" class="d-flex justify-content-center">
        {{ operator.matricule || '---' }}
    </div>
</template>

<script lang="ts" setup>
import { Operator } from '~/types/operator.type';

interface Props {
    columnKey: 'corporateName' | 'companyCreatedAt' | 'matricule' | 'isMember' | 'totalNumberOfStaff' | 'description';
    operator: Operator;
}

defineProps<Props>();
</script>
