import statusCodes from "../config/statusCodes.js";
import { Players } from "../models/players.js";
import { validateNewPlayer } from "../validations/playerValidations.js";

export const getAllPlayersData = async (req, res) => {
    try {
        const response = await Players.find({});
        return res.json({ data: response });
    }
    catch (err) {
        console.log("@getAllPlayersData : " + err.name + "\n" + err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }
}

export const getPlayerData = async (req, res) => {
    try {
        const payload = req.params;
        // console.log(payload);
        // { _id: '667bd55afe055ca25ec03052' }

        const response = await Players.findOne({ ...payload });

        return res.json({ data: response });
    }
    catch (err) {
        console.log("@getPlayerData : " + err.name + "\n" + err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }
}

export const addPlayer = async (req, res) => {
    try {
        const payload = req.body;
        const response = validateNewPlayer(payload.name, payload.age, payload.team, payload.position, payload.ppg, payload.rpg, payload.apg)

        if(!response.status){
            return res.status(statusCodes.badRequest).json({msg:response.msg})
        }

        await Players.create(payload);
        return res.status(statusCodes.resourceCreated).json({ msg: "Player added successfully" })
    }
    catch (err) {
        console.log("@addPlayer : " + err.name + "\n" + err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }
}

export const updatePlayer = async (req, res) => {
    try {
        const payload = req.body;

        const playerExists = await Players.findOne({ id: payload.id });

        if (!playerExists) {

            return res.json({ msg: "Failed to update, player does not exist." })
        }

        await Players.updateOne({ id: payload.id }, { ...payload });
        return res.json({ msg: "Player updated successfully" })

    }
    catch (err) {
        console.log("@addPlayer : " + err.name + "\n" + err.message);
        return res.status(statusCodes.internalServerError).json({ msg: "Internal server error" })
    }
}