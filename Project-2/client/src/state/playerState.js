import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { fetchData } from "../utils/data";
import { accessTokenAtom } from "./userState";
import ShorUniqueId from 'short-unique-id';
const uid = new ShorUniqueId({length:10})


export const playerIdsAtom = atom({
    key: "playerIds",
    default: selector({
        key: "playerIdSelector",
        get: async ({get}) => {
            const Token = get(accessTokenAtom);
            try{
                const response = await fetchData(Token);
                const playersData = response.data ?? [];
                const playerIds = [];
                const updatedPlayersData = []
                
                playersData.map(player => {
                    const id = uid.rnd();
                    playerIds.push(id);
                    updatedPlayersData.push({...player,id});
                });

                await new Promise(r => setTimeout(r,2000))

                localStorage.setItem("playersInfo",JSON.stringify(updatedPlayersData));

                return playerIds;
            }
            catch(err){
                console.log("@playerIdsAtom : \n"+err);
                return [];
            }
        }
    })
})

export const playersAtomFamily = atomFamily({
    key: "playersAtomFamily",
    default: selectorFamily({
        key: "playerAtomSelector",
        get: (Id) => async ({get}) => {
            const playersData = JSON.parse(localStorage.getItem("playersInfo"))

            return playersData.find(player => player.id === Id);
        }
    })
})

export const updatePlayerAtom = atom({
    key: "selectedPlayer",
    default: {
        id: "",
        name:"",
        team: "",
        position: "",
        age:"",
        ppg: "",
        apg:"",
        rpg: ""
    }
})