export const config = {
    API: {
        ROOT: "/api",
        ID: "/:id"
    },
    JWT: {
        SECRET: "7gpJqpToxJt0uoum2CemwUDPSdvKcGts3vttTmJ0humR0euuL0PU0l5lsWlv9IT0gXAN4HoFbtnpuAtdi75bIjn7Jz1CwwEgl4TjD0op1Dm9n96ixulx5mlvpWYPElS0"
    },
    SRC: process.cwd() + '/src',
    FAVICON : process.cwd() + '/src/public/favicon.ico',
    PUBLIC: {
        VIEWS: process.cwd() + '/src/public/views',
        STYLES: process.cwd() + '/src/public/styles',
        JS: process.cwd() + '/src/public/js'
    },
    USER: {
        REQUESTS: {
            FREE: 10,
            MEDIUM: 1000,
            ULTIMATE: 10000
        }
    }
    
}