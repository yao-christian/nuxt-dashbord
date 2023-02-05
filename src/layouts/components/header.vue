<template>
    <nav class="header">
        <div>
            <div class="header-content header-content-desktop">
                <div class="flex-fill"></div>

                <div class="header-content-desktop-navbar-block">
                    <NuxtLink class="header-item header-link" to="/">
                        <span>Accueil</span>
                    </NuxtLink>

                    <NuxtLink class="header-item header-link" to="/kpis-catalog">
                        <span>Catalogue des indicateurs</span>
                    </NuxtLink>

                    <NuxtLink class="header-item header-link" to="/operators">
                        <span>Opérateurs</span>
                    </NuxtLink>
                </div>

                <Dropdown>
                    <div class="d-flex align-items-center header-item cursor-pointer px-20 bg-color-gray-200">
                        <Avatar class="mr-5">
                            <template #icon>
                                <i class="fa-regular fa-user fs-14"></i>
                            </template>
                        </Avatar>
                        <div class="d-flex flex-column" style="line-height: 15px;">
                            <span>{{ authStore.currentUser?.lastname }}</span>
                        </div>
                    </div>

                    <template #overlay>
                        <Menu>
                            <MenuItem key="1">
                            <NuxtLink to="/account/profile">Mon compte</NuxtLink>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem key="3" class="bg-color-gray-300">
                            <a href="#" @click="logout">Déconnexion</a>
                            </MenuItem>
                        </Menu>
                    </template>
                </Dropdown>
            </div>

            <div class="header-content header-content-mobile">
                <MenuOutlined class="mr-20" @click="toogleSidebarVisible" />

                <div class="flex-fill"></div>

                <Dropdown>
                    <div class="d-flex align-items-center header-item cursor-pointer px-20 bg-color-gray-200">
                        <Avatar class="mr-5">
                            <template #icon>
                                <i class="fa-regular fa-user fs-14"></i>
                            </template>
                        </Avatar>
                        <div class="d-flex flex-column" style="line-height: 15px;">
                            <span>{{ authStore.currentUser?.lastname || 'Yao Christian' }}</span>
                            <span class="fs-13 text-muted">{{ authStore.currentUser?.profile || 'Admin' }}</span>
                        </div>
                    </div>

                    <template #overlay>
                        <Menu>
                            <MenuItem key="1">
                            <NuxtLink to="/account/profile">Mon compte</NuxtLink>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem key="3" class="bg-color-gray-300">
                            <a href="#" @click="logout">Déconnexion</a>
                            </MenuItem>
                        </Menu>
                    </template>
                </Dropdown>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue';
import { Avatar, Dropdown, Menu, MenuDivider, MenuItem } from 'ant-design-vue';

const authStore = useAuthStore();

const sidebarVisible = ref(false);

function toogleSidebarVisible() {
    sidebarVisible.value = !sidebarVisible.value;
}

async function logout() {
    authStore.logout();
}
</script>

<style lang="scss" scoped>
$bg-color : $blue-light-color;

.header {
    background-color: #fff;
    box-shadow: 0 1px 1px $gray-400-color;

    &-content {
        display: flex;
        align-items: center;
        height: $navbar-height;
        padding: 0 1rem;

        &-desktop {
            display: none;

            @include md-up {
                display: flex;
                align-items: center;

                &-navbar-block {
                    display: flex;
                    align-items: center;
                }
            }
        }

        &-mobile {
            @include md-up {
                display: none;
            }
        }
    }

    &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-size: 14px !important;
    }

    &-link {
        font-size: 1rem;
        cursor: pointer;
        margin: 0 1rem;

        &:hover::after,
        // &.router-link-active::after,
        &.router-link-exact-active::after {
            width: 100%;
        }
    }
}
</style>