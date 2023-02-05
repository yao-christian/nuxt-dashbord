<template>
    <Card hoverable class="package" :class="{ 'package-dark': isSelected }" @click="emit('click')">
        <h4 class="package-title">{{ pack.title }}</h4>

        <h2 class="package-amount">{{ $formatAmount(pack.amount) }}</h2>

        <p class="package-description">
            {{ pack.descrition }}
        </p>

        <ul class="mb-20">
            <li class="mb-10" v-for="advantage in pack.advantages" :key="advantage.id">
                <div class="d-flex align-items-center">
                    <check-circle-filled class="color-success" />
                    <span class="ml-10 fs-14">{{ advantage.description }}</span>
                </div>
            </li>
        </ul>
    </Card>
</template>

<script lang='ts' setup>
import type { Pack } from '~/types/pack.type';
import { Button as AButton, Card } from 'ant-design-vue';
import { CheckCircleFilled } from '@ant-design/icons-vue';

defineProps<{ pack: Pack, isSelected?: boolean }>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();
</script>

<style scoped lang="scss">
$color-white: #fff;
$bg-dark-color: #0c1e1e;

$color: #000;
$bg-color: #fff;

.package {
    min-width: 300px;
    padding: 20px;
    background-color: $bg-color;
    border-radius: 15px;
    box-shadow: 0 1px 20px rgb(56 65 74 / 15%);
    color: $color;

    &-title {
        display: flex;
        justify-content: center;
        font-size: 25px;
    }

    &-amount {
        display: flex;
        justify-content: center;
        font-size: 35px;
        font-weight: 900;
    }

    &-description {
        margin: 30px 0;
        font-size: 15px;
    }

    &-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;

        &:hover {
            background-color: darken($secondary-color, 5);
            color: #fff;
        }
    }

    &-dark {
        background-color: #050a30;
        color: $color-white;
        border-color: $bg-dark-color;

        .package-title,
        .package-amount {
            color: #fff;
        }

        .package-btn {
            border-color: $secondary-color;
        }
    }

}
</style>

