module.exports = {
    apps: [{
        name: 'app',   // default name for new pm2 instance
        script: '/app/node-ts/build/app.js',
        max_restarts: 3,
        restart_delay: 3000
    }]
}

