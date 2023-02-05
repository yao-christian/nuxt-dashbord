<template>
    <div>
        <LoadingPage v-if="isLoading" />

        <div v-else class="step-select-pack-grid">
            <Pack @click="selectPack(pack)" v-for="pack in packs" :pack="pack" :key="pack.id"
                :is-selected="registerSubscriber?.pack?.id == pack.id" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Pack as PackType } from '~/types/pack.type';
import { useRegisterSubscriber } from '../state';

const registerSubscriber = useRegisterSubscriber();

const { packs, pending: isLoading } = await usePacks();

function selectPack(newSelectedPack: PackType) {
    registerSubscriber.value.pack = newSelectedPack;
}
</script>

<style lang="scss" scoped>
.step-select-pack-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
</style>