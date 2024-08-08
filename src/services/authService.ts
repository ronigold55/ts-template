import runQuery from "../db/dal";
import UserModel from "../models/userModel";
import { createToken } from "../utils/authUtils";

export async function createUser(user:UserModel) {
    
    user.validate();

    let q = `INSERT INTO user (username, password, email) 
            values ('${user.username}', '${user.password}', '${user.email}');`;

    await runQuery(q);

    q = `SELECT id FROM user WHERE email='${user.email}';`;
    const res = await runQuery(q);
    const id = res[0].id;
    user.id = id;

    user.token = createToken(user);

    q = `UPDATE user SET token='${user.token}' WHERE id=${user.id};`;
    await runQuery(q)

    return user.token;
}