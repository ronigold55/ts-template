import Joi from "joi";

class CredentialsModel {

    public username: string;
    public password: string;
   
    public constructor(user: CredentialsModel) {

        this.username = user.username;
        this.password = user.password;
    }

    private static validateSchema = Joi.object({

        username: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(4).max(100)
    });

    public validate(): string {
        const result = CredentialsModel.validateSchema.validate(this);
        return result.error?.message;
    };

}

export default CredentialsModel;