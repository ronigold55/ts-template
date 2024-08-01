class AppConfig {
    readonly port : number = 4000
    readonly routePrefix = "/api/v1";
    readonly doormanKey = "rivka-token-temp-test-whatever";
    readonly dbConfig = {
        host: 'localhost',
        port: 3309,
        database: 'store',
        user: 'root',
        password: ''
    }
}

export const appConfig = new AppConfig()