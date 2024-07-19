import { useRecoilState } from "recoil"
import { accessTokenAtom, userAtom } from "../state/userState"
import { handleLogin } from "../utils/auth"
import {jwtDecode} from 'jwt-decode';


export const useAuth = () => {
    const [user, setUser] = useRecoilState(userAtom)
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom)
    
    const Login = async (username, password) => {
        try{
            const response = await handleLogin(username, password);

            setUser({username:response.username, fullName: response.fullName,role: response.role, isAuthenticated: true});

            setAccessToken(response.accessToken);

            return {status: true};
        }
        catch(err){
            console.log("@Login : \n"+err);

            const errMsg = err.response.data.msg;

            return {status: false,msg:errMsg}
        }
    }

    const isTokenValid = () => {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp > (Date.now() / 1000);
    }

    const rotateToken = async () => {
        try{
            // const response = await axios.get()
        }
        catch(err){
            console.log("@rotateToken : \n"+err);
            return {status: false}
        }
    }

    return {Login};
}