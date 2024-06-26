import { atom } from "recoil";

export const userInfo = atom({
    key: "userAtom",
    default: {
        username: "User",
        role: undefined
    }
});

export const accessToken = atom({
    key:"accessToken",
    default: undefined
})

export const playersData = atom({
    key:"playersData",
    default: undefined
})