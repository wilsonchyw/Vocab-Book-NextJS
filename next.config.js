/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
module.exports = withPWA({
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
    },
    reactStrictMode: true,
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 3000,
            aggregateTimeout: 300,
        };
        return config;
    },
    serverRuntimeConfig: {
        secret: "SECRET",
        LD_LIBRARY_PATH: process.env.LD_LIBRARY_PATH,
        WALLET: process.env.WALLET,
        DATABASE_USER: process.env.DATABASEUSER,
        DATABASE_PASS: process.env.DATABASEPASS,
        CONNNETSTRING: process.env.CONNNETSTRING,

        firebaseAdmin: {
            projectId: process.env.projectId,
            privateKey: process.env.privateKey,
            clientEmail: process.env.clientEmail,
        },
    },
    publicRuntimeConfig: {
        endpoint: process.env.API_ENDPOINT,
        firebase: {
            apiKey: process.env.apiKey,
            authDomain: process.env.authDomain,
            projectId: process.env.projectId,
            storageBucket: process.env.storageBucket,
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.appId,
            measurementId: process.env.measurementId,
        },
    },
    typescript: {
        ignoreBuildErrors: true,
    },
});
