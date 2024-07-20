import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { addData, deleteData, updateData } from "../utils/data";
import { accessTokenAtom } from "../state/userState";
import axios from "axios";


export const useData = () => {
    const accessToken = useRecoilValue(accessTokenAtom)

    const addPlayerData = async (payload) => {
        try{

            if(payload.name === "" || payload.team === "" || payload.position === ""){
                return {status: false, msg:"Name, Team and Position cannot be empty"}
            }
            
            if(payload.age !== "" && parseInt(payload.age) === NaN){
                return {status: false, msg:"Age has to be a number"}
            }

            if(payload.ppg !== "" && parseFloat(payload.ppg) === NaN){
                return {status: false, msg:"Only real values are allowed for PPG"}
            }

            if(payload.apg !== "" && parseFloat(payload.apg) === NaN){
                return {status: false, msg:"Only real values are allowed for APG"}
            }

            if(payload.rpg !== "" && parseFloat(payload.rpg) === NaN){
                return {status: false, msg:"Only real values are allowed for RPG"}
            }

            const updatedPayload = {...payload,
                age: payload.age === "" ? null : parseInt(payload.age),
                ppg: payload.ppg === "" ? null : parseFloat(payload.ppg),
                apg: payload.apg === "" ? null : parseFloat(payload.apg),
                rpg: payload.rpg === "" ? null : parseFloat(payload.rpg),
            }

            await addData(accessToken,updatedPayload);

            return {status:true};
        }
        catch(err){
            console.log("@addNewPlayer : \n"+err);
            const errMsg = err.response.data.msg;
            return {status: false,msg:errMsg}
        }
    }

    const updatePlayerData = async (payload) => {
        try{

            if(payload.name === "" || payload.team === "" || payload.position === ""){
                return {status: false, msg:"Name, Team and Position cannot be empty"}
            }
            
            if(payload.age !== "" && parseInt(payload.age) === NaN){
                return {status: false, msg:"Age has to be a number"}
            }

            if(payload.ppg !== "" && parseFloat(payload.ppg) === NaN){
                return {status: false, msg:"Only real values are allowed for PPG"}
            }

            if(payload.apg !== "" && parseFloat(payload.apg) === NaN){
                return {status: false, msg:"Only real values are allowed for APG"}
            }

            if(payload.rpg !== "" && parseFloat(payload.rpg) === NaN){
                return {status: false, msg:"Only real values are allowed for RPG"}
            }

            const updatedPayload = {...payload,
                age: payload.age === "" ? null : parseInt(payload.age),
                ppg: payload.ppg === "" ? null : parseFloat(payload.ppg),
                apg: payload.apg === "" ? null : parseFloat(payload.apg),
                rpg: payload.rpg === "" ? null : parseFloat(payload.rpg),
            }

            await updateData(accessToken,updatedPayload);

            return {status:true};
        }
        catch(err){
            console.log("@updatePlayerData : \n"+err);
            return {status: false}
        }
    }

    const deletePlayerData = async (player) => {
        try{
            
            await deleteData(accessToken,player);

            return {status:true};
        }
        catch(err){
            console.log("@deletePlayerData : \n"+err);
            const errMsg = err.response.data.msg;
            return {status: false,msg:errMsg}
        }
    }

    const updateVersion = async () => {
        try{
            const response = await axios.get("http://localhost:3000/data/history",{
                headers:{
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': `application/json`
                }
            })

            return {status:true,version: response.data.version};
        }
        catch(err){
            console.log("@updateVersion : \n"+err);
            return {status:false}
        }
    }

    return {addPlayerData, updatePlayerData, deletePlayerData, updateVersion}
}