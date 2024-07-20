import { useRecoilState } from "recoil"
import { accessTokenAtom, userAtom } from "../state/userState.js"
import { handleLogin, loggedIn, newAccessToken } from "../utils/auth.js"
import { jwtDecode } from 'jwt-decode';


export const useAuth = () => {
    const [user, setUser] = useRecoilState(userAtom)
    const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom)

    const Login = async (username, password) => {
        try {
            const response = await handleLogin(username, password);

            setUser({
                username: response.username, fullName: response.fullName, role: response.role, createdAt: response.createdAt,
                isLoggedIn: response.isLoggedIn, activeSessions: response.activeSessions, isAuthenticated: true
            });

            setAccessToken(response.accessToken);

            return { status: true };
        }
        catch (err) {
            console.log("@Login : \n" + err);

            const errMsg = err.response.data.msg;

            return { status: false, msg: errMsg }
        }
    }

    const isLoggedIn = async () => {
        try {
            const response = await loggedIn(user.username);

            return response.isActive;
        }
        catch (err) {
            console.log("@isLoggedIn : \n" + err);
            return false;
        }
    }

    const isTokenValid = () => {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp > (Date.now() / 1000);
    }

    const rotateToken = async () => {
        try {
            const response = await newAccessToken();

            return { status: true, newAccessToken: response.newAccessToken };
        }
        catch (err) {
            console.log("@rotateToken : \n" + err);

            return { status: false }
        }
    }


    return { Login, isTokenValid, rotateToken, isLoggedIn };
}