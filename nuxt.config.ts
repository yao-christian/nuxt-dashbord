export default defineNuxtConfig({
    css: [
        "~/assets/styles/less/main.less",
        "~/assets/styles/scss/main.scss",
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/styles/global.scss";'
                },
                less: {
                    javascriptEnabled: true,
                    additionalData: '@import "~/assets/styles/global.less";'
                },
            }
        }
    },
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
        }
    },
    modules: ['@pinia/nuxt'],
    app: {
        pageTransition: {
            mode: "out-in",
            name: "layout"
        }
    },
    components: {
        dirs: [
            "~/components/pages",
            '~/components/shared'
        ]
    },
    imports: {
        dirs: ['stores', 'services', 'constants']
    },
    srcDir: 'src'
});
