import { UploadedFile } from "express-fileupload";
import Joi from "joi";

class VacationModel {

    public vacationId: number;
    public destination: Date;
    public description: Date;
    public image: UploadedFile;
    public imageName: string;
    public arrivalDate: string;
    public departureDate: string;
    public price: number;
    public followersCount: number;
    public isFollowed: boolean;
    
    public constructor (vacation: VacationModel) {

        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.arrivalDate = vacation.arrivalDate;
        this.departureDate = vacation.departureDate;
        this.price = vacation.price;
        this.followersCount = vacation.followersCount;
        this.isFollowed = vacation.isFollowed;

    }

    private static validationSchema = Joi.object({

        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(5).max(300),
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
        arrivalDate: Joi.string().required(),
        departureDate: Joi.string().required(),
        price: Joi.number().required().positive(),
        followersCount: Joi.number().optional().integer().min(0),
        isFollowed: Joi.boolean().optional()
        
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default VacationModel;