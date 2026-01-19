module.exports = {
    apps: [
        {
            name: 'cs-frontend',
            cwd: './frontend',
            script: 'npm',
            args: 'start',
            env: {
                PORT: 3000,
                NODE_ENV: 'production',
            },
        },
        {
            name: 'cs-backend',
            cwd: './backend',
            script: 'npm',
            args: 'start',
            env: {
                PORT: 5000,
                NODE_ENV: 'production',
            },
        },
    ],
};
