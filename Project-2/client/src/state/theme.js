import { atom } from "recoil";

export const themeAtom = atom({
    key: "themeAtom",
    default: "light",
    effects: [
        ({setSelf, onSet}) => {
            const {theme} = JSON.parse(localStorage.getItem("Preferences"))
            
            if(theme){
                setSelf(theme)
            }

            onSet((newTheme) => {
                setSelf(newTheme);
                localStorage.setItem("Preferences",JSON.stringify({"theme": newTheme}))
            })
        }
    ]
})

