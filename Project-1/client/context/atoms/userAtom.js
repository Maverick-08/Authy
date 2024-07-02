import {atom, selector} from 'recoil';

export const userAtom = atom({
    key: "userInfo",
    default: {
        username:"",
        role:"User",
        id: ""
    }
})

export const accessTokenAtom = atom({
    key:"accessToken",
    default: selector({
        key:"accessTokenSelector",
        get: ({get}) => {
            const accessToken = localStorage.getItem("accessToken") ?? "";
            return accessToken;
        }
    })
})

export const refreshTokenAtom = atom({
    key:"refreshToken",
    default: selector({
        key:"refreshTokenSelector",
        get: ({get}) => {
            const refreshToken = localStorage.getItem("refreshToken") ?? "";
            return refreshToken;
        }
    })
})