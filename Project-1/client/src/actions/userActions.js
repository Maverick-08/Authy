import { useRecoilState } from "recoil"
import { accessToken, userInfo } from "../state/atoms/userAtom.js"
import axios from "axios";


export const userActions = () => {
    const [user,setUser] = useRecoilState(userInfo);
    const [token, setToken] = useRecoilState(accessToken);

    const Login = async ({username,password})=>{
        try{
            const response = (await axios.post("http://localhost:3000/auth",{username,password})).data;

            if(response.status){
                setUser({username : response.username, role : response.role});
                setToken(response.accessToken);
                return true;
            }

            return false;
        }
        catch(err){
            console.log("@Login : "+err.name+"\n"+err.message);
            return false;
        }
    } 

    const isTokenValid = async () => {
        try{
            const response = await axios.get("http://localhost:3000/check",{
                headers:{
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            });
            const status = response.data.status;

            return status ? true : false;
        }
        catch(err){
            console.log("@isTokenValid : "+err.name+"\n"+err.message);
            return false;
        }
    }

    const getNewToken = async () => {
        try{
            const response = await axios.get("http://localhost:3000/check",{
                headers:{
                    'authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            });

            const newToken = response.data.accessToken;

            if(newToken){
                setToken(newToken);
                return true;
            }

            return false;
        }
        catch(err){
            console.log("@getNewToken : "+err.name+"\n"+err.message);
            return false;
        }
    }

    return {Login, isTokenValid, getNewToken};
}