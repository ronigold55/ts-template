import { OkPacket } from "mysql";
import auth from "../2-utils/auth";
import hash from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { UnauthorizeError, ValidationError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> { // Returning a new token

    // Validate: 
    const error = user.validate();
    if (error) throw new ValidationError(error);

    // hash password
    user.password = hash(user.password);

    // insert the new user to the DB
    const sql = `INSERT INTO users (userId, firstName, lastName, username, password, roleId) VALUES(
                    DEFAULT, ?, ?, ?, ?, ?)`;

    const result: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, 2]);

    // update the user with the returned ID
    user.userId = result.insertId;

    // Delete user password before return: 
    delete user.password;

    // Generate new token: 
    const token = auth.generateNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    // Validate: 
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    // hash password
    credentials.password = hash(credentials.password);

    // Get the user by his credentials
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    const user = users[0];

    // If no such user exists: 
    if (!user) throw new UnauthorizeError("Incorrect username or password!")

    // Delete user password before return:
    delete user.password;

    // Generate new token: 
    const token = auth.generateNewToken(user);

    return token;

};

async function usernameExists(username: string): Promise<boolean> {

    // Get amount of users with 'username' 
    const sql = `SELECT
                        COUNT(*) AS usersWithName
                        FROM users
                        WHERE username = ?`;
    const users = await dal.execute(sql, [username]);

    // if there are more than 0, the username exists.
    return users[0].usersWithName > 0;
}

export default {
    register,
    login,
    usernameExists
}