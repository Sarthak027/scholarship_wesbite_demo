module.exports = {
    apps: [
        {
            name: 'scholarship-frontend',
            cwd: './frontend',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        },
        {
            name: 'scholarship-backend',
            cwd: './backend',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 5000
            }
        }
    ]
};
