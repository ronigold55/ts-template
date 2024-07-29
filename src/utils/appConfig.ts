class AppConfig {
    readonly port : number = 4000

    readonly dbConfig = {
        host: 'localhost',
        port: 3309,
        database: 'store',
        user: 'root',
        password: ''
    }
}

export const appConfig = new AppConfig()