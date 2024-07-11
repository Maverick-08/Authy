import { atom } from "recoil";

export const userAtom = atom({
    key: "userAtom",
    default: {
        id: "",
        username: "",
        role: "",
        accessToken: "",
        isAuthenticated: false
    },
    effects: [
        ({ setSelf, onSet }) => {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            if (userInfo && userInfo.isAuthenticated) {
                setSelf({
                    id: userInfo.id,
                    username: userInfo.username,
                    role: userInfo.role,
                    accessToken: userInfo.accessToken,
                    isAuthenticated: true
                })
            }

            onSet((newValue) => {
                setSelf(newValue);
                localStorage.setItem("userInfo", JSON.stringify(newValue));
            })
        }
    ]
})