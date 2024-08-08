class AppConfig {
    readonly port : number = 4000
    readonly routePrefix = "/api/v1";
    readonly errorLogFile = __dirname + "\\..\\logs\\error.log";
    readonly accessLogFile = __dirname + "\\..\\logs\\access.log";
    readonly doormanKey = "rivka-token-temp-test-whatever";
    readonly jwtSecrete = "This is example for secrete key %^&#$%#B FGERT";
    readonly dbConfig = {
        host: 'localhost',
        port: 3309,
        database: 'store',
        user: 'root',
        password: ''
    }
}

export const appConfig = new AppConfig()