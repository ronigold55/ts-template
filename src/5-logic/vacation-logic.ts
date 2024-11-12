import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import safeDelete from "../2-utils/safe-delete";
import FollowerModel from "../4-models/follower-model";
import config from "../2-utils/config";
import auth from "../2-utils/auth";


//Get all vacations with followers count
async function getAllVacations(authHeader: string): Promise<VacationModel[]> {

    //get the user from the provided Token:
    const userId = auth.getUserIdFromToken(authHeader);

    const sql = `SELECT DISTINCT
                    V.*,
                    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowed,
                    COUNT(F.userId) AS followersCount
                    FROM vacations as V LEFT JOIN followers as F
                    ON V.vacationId = F.vacationId
                    GROUP BY vacationId
                    ORDER BY arrivalDate`;

    const vacations = await dal.execute(sql, [userId]);

    // validate if the vacation was returned:
    if (!vacations) throw new IdNotFoundError(userId);

    vacations.map(v => v.isFollowed = v.isFollowed ? true : false);

    return vacations;
};

//Get one vacation by vacationId
async function getOneVacation(vacationId: number): Promise<VacationModel> {

    //get one vacation by id
    const sql = `SELECT * FROM vacations
                    WHERE vacationId = ?`;

    const vacations = await dal.execute(sql, [vacationId]);

    const vacation = vacations[0];

    // validate if the vacation was returned:
    if (!vacation) throw new IdNotFoundError(vacationId);

    return vacation;
};

//Add follower
async function addFollow(follow: FollowerModel): Promise<FollowerModel> {

    // validate the provided follower:
    const error = follow.validate();
    if (error) throw new ValidationError(error);

    // add the follower connection in the DB
    const sql = `INSERT INTO followers VALUES (?, ?)`;

    await dal.execute(sql, [follow.userId, follow.vacationId]);

    return follow;
};


//Delete follower
async function deleteFollow(follow: FollowerModel): Promise<void> {

    // delete the follower connection in the DB
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId =?`;

    const result: OkPacket = await dal.execute(sql, [follow.userId, follow.vacationId]);

    // make sure the update was registered
    if (result.affectedRows === 0) throw new IdNotFoundError(follow.vacationId);
};


//Update vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    //validate
    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    // Handle image: 
    if (vacation.image) {
        // delete the file
        await safeDelete(`${config.imagesFolder}/${vacation.imageName}`);
        // save the file extension
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf(".")); // .gif / .png / .jpg / .jpeg 
        // generate a universally unique name for the file
        vacation.imageName = uuid() + extension;
        //move the file to assets
        await vacation.image.mv(`${config.imagesFolder}/${vacation.imageName}`); // mv = move = copy image
        // Delete file before saving.
        delete vacation.image;
    };

    // update the vacation in the DB
    const sql = `UPDATE vacations SET  
                    destination = ?,
                    description = ?,
                    imageName = ?,
                    arrivalDate = ?,
                    departureDate = ?,
                    price = ?
                    WHERE vacations.vacationId = ?`;

    const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.imageName,
    vacation.arrivalDate, vacation.departureDate, vacation.price, vacation.vacationId]);

    // make sure the update was registered
    if (result.affectedRows === 0) throw new IdNotFoundError(vacation.vacationId);
    return vacation;
};


//Add vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    //validate
    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    // Add the new image: 
    if (vacation?.image) {
        // save the file extension
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        // generate a universally unique name for the file
        vacation.imageName = uuid() + extension;
        //move the file to assets
        await vacation.image.mv(`${config.imagesFolder}/${vacation.imageName}`);
        // Delete file before saving.
        delete vacation.image;
    };

    //insert new vacation into DB
    const sql = `INSERT INTO vacations VALUES (DEFAULT, ?, ?, ?, ?, ?, ? )`;

    const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.imageName,
    vacation.arrivalDate, vacation.departureDate, vacation.price]);

    // update the vacation object with the returned data
    vacation.vacationId = result.insertId;
    vacation.followersCount = 0;
    vacation.isFollowed = false;

    return vacation;
};


//Delete vacation
async function deleteVacation(vacationId: number): Promise<void> {

    //get the current image by vacationId
    const sqlSelectImage = `SELECT imageName FROM vacations WHERE vacations.vacationId = ?`;
    const vacations = await dal.execute(sqlSelectImage, [vacationId]);
    const vacation = vacations[0];
    if (!vacations) throw new IdNotFoundError(vacationId);
    //delete the image
    await safeDelete(`${config.imagesFolder}/${vacation.imageName}`);

    // delete the vacation by vacationId from DB
    const sql = `DELETE FROM vacations WHERE vacations.vacationId = ? `;

    const result: OkPacket = await dal.execute(sql, [vacationId]);

    // make sure the update was registered
    if (result.affectedRows === 0) throw new IdNotFoundError(vacationId);

};


export default {
    getAllVacations,
    getOneVacation,
    addFollow,
    deleteFollow,
    updateVacation,
    addVacation,
    deleteVacation
};


