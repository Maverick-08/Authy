import { atomFamily, atom } from "recoil";

export const playerAtomFamily = atomFamily({
    key: "playerAtomFamily",
    default: (Id) => {
        const playersData = JSON.parse(localStorage.getItem("playersInfo"));

        return playersData.find(player => Id === player.id)
    }
})

export const updatePlayerAtom = atom({
    key:"updatePlayerAtom",
    default: {}
})

export const playerIdsAtom = atom({
    key:"playerIdsAtom",
    default: []
})