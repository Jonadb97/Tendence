export default {
    // Server host
    server: {
        port: process.env.PORT,
        host: '0.0.0.0'
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Agenda Tendence',
        htmlAttrs: {
            lang: 'es-AR',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/axios', ssr: false },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/fontawesome',

    ],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/axios', ssr: false }
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/tailwindcss',
        'nuxt-buefy',
        '@nuxtjs/auth',
        '@nuxtjs/toast',
    ],
    
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },
    toast: {
        position: 'top-center',
    },
    
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    // Font Awesome Configuration:
    fontawesome: {
        icons: {
            solid: [],
        },
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/login', method: 'post', propertyName: 'token' },
                    logout: { url: '/', method: 'post' },
                    user: { url: 'TurnosPage', method: 'get', propertyName: 'user' },
                },
            },
        },
    },
}