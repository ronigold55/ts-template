class AppConfig {
    readonly port : number = 4000
    readonly routePrefix = "/api/v1";
    
    readonly dbConfig = {
        host: 'localhost',
        port: 3306,
        database: 'servers',
        user: 'root',
        password: ''
    }
}

export const appConfig = new AppConfig();