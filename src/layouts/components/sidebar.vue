<template>
    <div class="sidebar">
        <div class="sidebar-brand">
            <a href="">
                <img class="logo-lg" src="~/assets/images/logos/logo.png" />
            </a>
        </div>

        <Menu class="sidebar-content" mode="inline" v-model:open-keys="menu.openKeys"
            v-model:selected-keys="menu.selectedKeys">
            <SubMenu key="users">
                <template #icon>
                    <i class="fa-solid fa-users"></i>
                </template>
                <template #title>Utilisateurs</template>

                <MenuItem key="subscribers">
                <NuxtLink to="/subscribers">Abonnés</NuxtLink>
                </MenuItem>

                <MenuItem key="operators">
                <NuxtLink to="/operators">Opérateurs</NuxtLink>
                </MenuItem>
            </SubMenu>

            <MenuItem key="kpis">
            <template #icon>
                <img src="~/assets/images/icons/kpi.png" alt="kpi-icon" width="15" />
            </template>
            <NuxtLink to="/kpis">Indicateurs</NuxtLink>
            </MenuItem>

            <MenuItem key="kpis-data">
            <template #icon>
                <img src="~/assets/images/icons/kpi.png" alt="kpi-icon" width="15" />
            </template>
            <NuxtLink to="/kpis-data">Données des indicateurs</NuxtLink>
            </MenuItem>

            <MenuItem key="kpi-families">
            <template #icon>
                <img src="~/assets/images/icons/kpi-families.png" alt="kpi-icon" width="15" />
            </template>
            <NuxtLink to="/kpi-families">Famille indicateurs</NuxtLink>
            </MenuItem>
        </Menu>
    </div>
</template>

<script lang="ts" setup>
import { Menu, MenuItem, SubMenu } from 'ant-design-vue';

const route = useRoute();
const routeName = route.name as string;
const menus = routeName?.split('-')

const menu = reactive({
    openKeys: [menus[0]],
    selectedKeys: [menus.slice(1).join('-')],
});
</script>

<style lang="scss" scoped>
$brand-height: $header-height;

.sidebar {
    height: 100%;
    border-width: 2px;
    width: $sidebar-width;
    box-shadow: 0 2px 4px rgb(15 34 58 / 12%);

    &-brand {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        height: $brand-height;
        background-color: $gray-100-color;

        .logo-lg {
            height: 50px;
        }
    }

    &-content {
        position: absolute;
        top: $brand-height;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;

        &:hover {
            overflow-y: auto;
        }
    }
}
</style>
