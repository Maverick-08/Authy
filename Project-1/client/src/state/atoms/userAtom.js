import { atom } from "recoil";

export const user = atom({
    key:"userAtom",
    default:{
        username:"",
        accessToken: "",
    }
})