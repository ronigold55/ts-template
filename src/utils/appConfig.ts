import path from "path";

class AppConfig {
    readonly port : number = 4000;
    readonly prodcutsImagesPrefix = path.resolve(__dirname, "..", "assets", "images");
    readonly routePrefix = "/api/v1";
    // readonly errorLogFile = __dirname + "\\..\\logs\\error.log";
    readonly errorLogFile = path.resolve(__dirname, "..", "logs", "error.log");
    readonly accessLogFile = __dirname + "\\..\\logs\\access.log";
    // readonly doormanKey = "rivka-token-temp-test-whatever";
    // readonly jwtSecrete = "This is example for secrete key %^&#$%#B FGERT";
    readonly dbConfig = {
        host: 'localhost',
        port: 3306,
        database: 'store',
        user: 'root',
        password: ''
    }
}

export const appConfig = new AppConfig()