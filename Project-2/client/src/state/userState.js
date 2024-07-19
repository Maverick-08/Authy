import { atom } from 'recoil';

export const userAtom = atom({
    key: "userAtom",
    default: {
        username: "",
        fullName: "",
        role: "",
        isAuthenticated: false
    },
    effects: [
        ({ onSet, setSelf }) => {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"))

            if (userInfo && userInfo.isAuthenticated) {
                setSelf({
                    username: userInfo.username,
                    fullName: userInfo.fullName,
                    role: userInfo.role,
                    isAuthenticated: userInfo.isAuthenticated
                })
            }

            onSet(
                (newState) => {
                    setSelf(newState)
                    localStorage.setItem("userInfo", JSON.stringify(newState))
                }
            )
        }
    ]
})

export const accessTokenAtom = atom({
    key: "accessTokenAtom",
    default: "",
    effects: [
        ({ setSelf, onSet }) => {
            const { accessToken } = JSON.parse(localStorage.getItem("Token")) ?? {accessToken: undefined}

            if (accessToken) {
                setSelf(accessToken)
            }

            onSet((newToken) => {
                setSelf(newToken);
                localStorage.setItem("Token", JSON.stringify({ accessToken: newToken }))
            })

        }
    ]
})