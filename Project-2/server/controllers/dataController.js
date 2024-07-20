import Client from "../config/dbConn.js";
import responseCode from "../config/responseCode.js";
import { validateFigures, validateName, validateTeam } from "../validations/playerValidations.js";

export const getPlayersData = async (req, res) => {
    try {
        const result = await Client.query('SELECT * FROM players')
        const playersData = result.rows;

        return res.json({ data: playersData })
    }
    catch (err) {
        console.log("@getData : \n" + err);
        return res.sendStatus(responseCode.internalServerError)
    }
}

export const addNewPlayer = async (req, res) => {
    try {
        const payload = req.body;

        // Check whether the required data is received 
        if (!payload.name || !payload.team) {
            return res.status(responseCode.badRequest).json({ msg: "Player name or team name is missing" })
        }

        const name = payload.name;
        const team = payload.team;
        const position = payload.position ?? null;
        const age = payload.age ?? null;
        const ppg = payload.ppg ?? null;
        const apg = payload.apg ?? null;
        const rpg = payload.rpg ?? null;

        // Validate the format of the data
        const checkName = validateName(name);
        const checkTeam = validateTeam(team);
        const checkFigures = validateFigures(age, ppg, apg, rpg);

        if (!checkName.isValid) {
            return res.status(responseCode.badRequest).json({ msg: checkName.msg })
        }

        if (!checkTeam.isValid) {
            return res.status(responseCode.badRequest).json({ msg: checkTeam.msg })
        }

        if (!checkFigures.isValid) {
            return res.status(responseCode.badRequest).json({ msg: checkFigures.msg })
        }

        // Check if player already exists
        const result = await Client.query('SELECT * FROM players WHERE name = $1', [name])

        if (result.rows.length > 0) {
            return res.status(responseCode.badRequest).json({ msg: "Player already exists" })
        }

        // If not : new player
        await Client.query('INSERT INTO players(name, team, position, age, ppg, apg, rpg) VALUES($1, $2, $3, $4, $5, $6, $7)', [name, team, position, age, ppg, apg, rpg]);

        return res.sendStatus(responseCode.resourceCreated);
    }
    catch (err) {
        console.log("@addNewPlayer : \n" + err);
        return res.sendStatus(responseCode.internalServerError)
    }
}

export const updatePlayerData = async (req, res) => {
    try {
        const payload = req.body;

        if (!payload.name || !payload.team || !payload.position || !payload.age || !payload.ppg || !payload.apg || !payload.rpg) {
            return res.status(responseCode.badRequest).json({ msg: "Missing Details" })
        }

        // Check if player exists in our database
        const result = await Client.query('SELECT * FROM players WHERE name = $1', [payload.name]);

        // If player does not exist
        if (!result.rows.length === 0) {
            return res.status(responseCode.unauthorised).json({ msg: "Player does not exist" })
        }

        // If player exists validate format and update the record

        const checkTeam = validateTeam(payload.team)
        const checkFigures = validateFigures(payload.age, payload.ppg, payload.apg, payload.rpg);

        if (!checkTeam.isValid) {
            return res.status(responseCode.badRequest).json({ msg: checkTeam.msg })
        }

        if (!checkFigures.isValid) {
            return res.status(responseCode.badRequest).json({ msg: checkFigures.msg })
        }

        await Client.query('UPDATE players SET name = $1, team = $2, position = $3, age = $4, ppg = $5, apg = $6, rpg = $7 WHERE name = $8', [payload.name, payload.team, payload.position, payload.age, payload.ppg, payload.apg, payload.rpg,payload.name])

        return res.sendStatus(responseCode.noContent);
    }
    catch (err) {
        console.log("@updatePlayerData : \n" + err);
        return res.sendStatus(responseCode.internalServerError)
    }
}

export const deletePlayerData = async (req,res) => {
    try{
        const {player} = req.params;

        // Check if the player exists in our db
        const result = await Client.query('SELECT * FROM players WHERE name = $1',[player])
        
        // If it does not
        if(!result.rows.length === 0){
            return res.status(responseCode.badRequest).json({msg:"Player does not exist"})
        }

        // If it does
        await Client.query('DELETE FROM players WHERE name = $1',[player]);

        return res.json({msg:"Player deleted"})
    }
    catch(err){
        console.log("@deletePlayerData : \n" + err);
        return res.sendStatus(responseCode.internalServerError)
    }
}