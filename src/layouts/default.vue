<template>
    <div class="layout">
        <TheHeader />
        <Sidebar />

        <div class="layout-content">
            <div class="layout-content-view">
                <slot></slot>
            </div>

            <footer class="footer">
                <p class="text-align-center">© 2022 | Association Africaine de l'Eau | Tous droits réservés.</p>
            </footer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Sidebar from './components/sidebar.vue';
import TheHeader from './components/header.vue';
</script>

<style lang="scss" scoped>
// 20px == margin top et bottom de layout-page-container
$height: calc(100vh - $navbar-height - $footer-height - (2*20px));

.header {
    position: fixed;
    top: 0;
    right: 0;
    left: $sidebar-width;
    z-index: $z-index-top;
}

.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: $z-index-top;
}

.layout {
    &-content {
        margin-left: $sidebar-width;
        padding-top: $header-height;

        &-view {
            min-height: calc(100vh - $header-height - $footer-height);
            padding: 1rem;
        }
    }
}

footer {
    background-color: $gray-400-color;
    border-top: $border;
    font-size: 14px;
    height: $footer-height;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
