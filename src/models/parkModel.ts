import Joi from "joi";

export class ParkModel {
    id?: number;
    isFree: boolean;
    isTaken: boolean;
    address_id: number;

    constructor(pm: Partial<ParkModel>) {
        this.id = pm.id;
        this.isFree = pm.isFree;
        this.isTaken = pm.isTaken;
        this.address_id = pm.address_id;
    }

    static schema = Joi.object({
        id: Joi.number().integer().optional(),
        isFree: Joi.boolean().required(),
        isTaken: Joi.boolean().required(),
        address_id: Joi.number().integer().required(),
    });
    
}