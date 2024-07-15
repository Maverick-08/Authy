import { atom } from "recoil";

export const alertAtom = atom({
    key: "alertAtom",
    default: {
        show: false,
        success: false,
        msg: ""
    }
})

export const userNotificationsAtom = atom({
    key: "userNotificationsAtom",
    default: []
})