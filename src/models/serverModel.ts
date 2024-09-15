import Joi from "joi";

export class Address {
    id: number;
    city: string;
    street: string;
    number: number;

    static schema = Joi.object({
        id: Joi.number().integer().optional(),
        city: Joi.string().max(100).required(),
        street: Joi.string().max(100).required(),
        number: Joi.number().integer().required(),
    });
}