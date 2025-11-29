export default {
  apps: [{
    name: 'credify-store-server',
    script: 'npx tsx server/index.ts',
    cwd: '/Users/axeor/DevSpace/Credify-Store/Credify-Store-Unified',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 5001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    ignore_watch: ['node_modules', 'logs', 'client/dist'],
    watch_options: {
      followSymlinks: false
    }
  }]
};