import Joi from "joi";
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public phoneNumber: number;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel) {

        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static validateSchema = Joi.object({
        
        userId: Joi.number().optional().positive().integer(),
        firstName: Joi.string().required().min(2).max(100),
        lastName: Joi.string().required().min(2).max(100),
        username: Joi.string().required().min(4).max(100),
        email: Joi.string().required().min(4).max(100),
        phoneNumber: Joi.string().required().min(9).max(20),
        password: Joi.string().required().min(4).max(128),
        roleId: Joi.string().optional().min(4).max(10),
    });

    public validate(): string {
        const result = UserModel.validateSchema.validate(this);
        return result.error?.message;
    };

}

export default UserModel;