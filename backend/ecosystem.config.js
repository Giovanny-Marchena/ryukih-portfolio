module.exports = {
    apps: [
        {
            name: 'ryukih-api',
            script: 'dist/server.js',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};