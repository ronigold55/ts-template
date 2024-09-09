import { ResultSetHeader } from "mysql2";
import runQuery from "../db/dal";
import { UnauthorizedError } from "../models/exceptions";
import UserModel from "../models/userModel";
import {
  createToken,
  encryptPassword,
  validatePassword,
} from "../utils/authUtils";

export async function createUser(user: UserModel) {
  user.validate();

  const hashedPassword = await encryptPassword(user.password);
  let q = `INSERT INTO user (username, password, email) values (?, ?, ?);`;

  let params = [user.username, hashedPassword, user.email];
  const insertedInfo = (await runQuery(q, params)) as ResultSetHeader | any;
  const userId = insertedInfo.insertId;

  user.token = createToken(user);
  q = `UPDATE user SET token=? WHERE id=?;`;
  params = [user.token, userId];
  await runQuery(q, params);

  return user.token;
}

export async function login(email: string, password: string) {
  let q = `SELECT * FROM user WHERE email=?;`;
  const res = await runQuery(q, [email]);
  if (
    res.length === 0 ||
    !(await validatePassword(password, res[0].password))
  ) {
    throw new UnauthorizedError("Wrong credentials");
  }

  const user = new UserModel(res[0]);
  if (!user.token) {
    user.token = createToken(user);
    q = `UPDATE user SET token=? WHERE id=?;`;
    await runQuery(q, [user.token, user.id]);
  }
  return user.token;
}
