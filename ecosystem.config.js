module.exports = {
    apps: [
        {
            name: 'confirmscholarship-backend',
            script: './backend/index.js',
            instances: 1,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 5005
            },
            error_file: './logs/backend-error.log',
            out_file: './logs/backend-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G'
        },
        {
            name: 'confirmscholarship-frontend',
            script: 'npm',
            args: 'start',
            cwd: './frontend',
            instances: 1,
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
                NEXT_PUBLIC_API_URL: 'http://127.0.0.1:5005'
            },
            error_file: './logs/frontend-error.log',
            out_file: './logs/frontend-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            merge_logs: true,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G'
        }
    ]
};
